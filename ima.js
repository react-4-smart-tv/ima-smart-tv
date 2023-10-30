import { logger } from "../../utils/logger";
import loadImaSdk from "./loadImaSdk";
import { EventEmitter } from "eventemitter3";
import FocusUtil from "../../utils/FocusUtil";
import Config from "../../Config";
import { formatTimeVideo, nowCustom } from "../../utils/Util";
import GlobalLoadingManager from "../../components/element/GlobalLoading";
import AppInfoManager from "../../AppInfoManager";
import { getValueFromObjectByKeys } from "../../utils/Util";
import NavigationService from "../../navigation/NavigationService";

const getSkipTime = (des) => {
  if (des) {
    const match = des.match(
      /\[\[skipable=[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)\]\]*$/
    );
    if (match && match[1] && typeof Number(match[1]) === "number") {
      return Number(match[1]);
    }
  }
  return 0;
};

export default class ImaSdkManager extends EventEmitter {
  name = "ImaSdkManager";
  imaSdk;
  imaAdsLoader;
  idVideo = "";
  idContainer = "";
  imaAdDisplayContainer;
  imaAdsManager;
  timerPlayer;
  _currentTime_ = -1;
  timerBuffering;
  _showAds_ = false;
  lastTimeAd = null;

  static getInstance(cb) {
    if (!this._instance) {
      this._instance = new ImaSdkManager(cb);
    }
    return this._instance;
  }

  static clear() {
    if (this._instance) {
      this._instance.destroy();
      delete this._instance;
    }
  }

  constructor(cb) {
    super();
    this._init(cb);
  }

  setVideoId(idVideo) {
    this.idVideo = idVideo;
  }

  isAdsShowing() {
    return this._showAds_;
  }

  getVideoElement() {
    const videoElement = FocusUtil.documentCache.getElementById(this.idVideo);
    if (!videoElement) {
      return null;
    }
    return videoElement;
  }

  setContainerId(idContainer) {
    this.idContainer = idContainer;
  }

  getContainerElement() {
    const containerElement = FocusUtil.documentCache.getElementById(
      this.idContainer
    );
    if (!containerElement) {
      return null;
    }
    return containerElement;
  }

  removeChild() {
    const container = this.getContainerElement();
    if (container && !this._showAds_) {
      if (container.hasChildNodes()) {
        for (let index = 0; index < container.children.length; index++) {
          const element = container.children[index];
          if (element.tagName === "DIV") {
            this.updateSkipTime(0, "removeChild");
            this.emit("adProgress", "", {
              currentTime: 0,
            });
            container.removeChild(element);
          }
        }
      }
    }
  }

  updateSkipTime(skipTime = 0, type = "") {
    // console.log("updateSkipTime", type, skipTime);
    this.emit("adSkipTime", skipTime);
  }

  isNextAds() {
    return true;
    const waitNextAdTime =
      getValueFromObjectByKeys(
        NavigationService.getInstance().getStateRedux(["Config", "config"]),
        ["waitNextAdTime"]
      ) || 3 * 60;
    if (
      this.lastTimeAd &&
      nowCustom() - this.lastTimeAd < waitNextAdTime * 1000
    ) {
      return false;
    }
    return true;
  }

  loadAds(config) {
    console.log("loadAds", config);
    if (
      !Config.ads.enable ||
      !this.imaSdk ||
      !this.imaSdk.AdsRequest ||
      AppInfoManager.getInstance().checkDisableAdsDevice() ||
      !this.isNextAds()
    ) {
      return;
    }
    this.removeChild();
    this.clearAds();
    const adsRequest = new this.imaSdk.AdsRequest();
    if (config.adsResponse) {
      adsRequest.adsResponse = config.adsResponse;
    } else {
      adsRequest.adTagUrl = config.adTagUrl;
    }
    this._ready_ = false;
    this._skipTime_ = config.adSkipTime;
    if (config.adSkipTime && config.adSkipTime > 0) {
      this.updateSkipTime(config.adSkipTime, "initial skip");
    }
    this.settingAdsLoader(adsRequest);
  }

  settingAdsLoader(adsRequest) {
    if (
      !this.imaSdk ||
      !this.imaSdk.AdsRequest ||
      !this.imaSdk.AdDisplayContainer
    )
      return;
    const videoElement = this.getVideoElement();
    const containerElement = this.getContainerElement();
    if (!videoElement || !containerElement) return;
    if (this.imaAdDisplayContainer) {
      this.imaAdDisplayContainer.destroy();
      this.imaAdDisplayContainer = null;
    }
    this.imaAdDisplayContainer = new this.imaSdk.AdDisplayContainer(
      containerElement,
      videoElement
    );
    this.imaAdDisplayContainer.initialize();
    this.clearAds();
    this.imaAdsLoader = new this.imaSdk.AdsLoader(this.imaAdDisplayContainer);
    this.imaSdk.settings.setNumRedirects(8);
    if (!!adsRequest) {
      adsRequest.setAdWillAutoPlay(true);
      adsRequest.setAdWillPlayMuted(false);
      adsRequest.linearAdSlotWidth = videoElement.clientWidth;
      adsRequest.linearAdSlotHeight = videoElement.clientHeight;
      adsRequest.nonLinearAdSlotWidth = videoElement.clientWidth;
      adsRequest.nonLinearAdSlotHeight = videoElement.clientHeight;
      this.imaAdsLoader.addEventListener(
        this.imaSdk.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
        this.onAdsManagerLoaded
      );
      this.imaAdsLoader.addEventListener(
        this.imaSdk.AdErrorEvent.Type.AD_ERROR,
        this.onAdError
      );
      this.imaAdsLoader.getSettings().setAutoPlayAdBreaks(false);
      this.imaAdsLoader.requestAds(adsRequest);
    }
  }

  skipAd() {
    if (!this._showAds_ || !this._ready_) return;
    if (this._skipTime_) {
      this.lastTimeAd = nowCustom();
      this.imaAdsManager && this.imaAdsManager.stop();
      this.imaAdsManager = undefined;
      return;
    }
    this.imaAdsManager.skip();
    this.onContentResumeRequested();
  }

  onAdsManagerLoaded = (event) => {
    const videoElement = this.getVideoElement();
    if (!videoElement) return;
    if (!this.imaSdk) return;
    const renderSetting = new this.imaSdk.AdsRenderingSettings();
    renderSetting.playAdsAfterTime = -1;
    renderSetting.useVideoAdUi = false;
    renderSetting.loadVideoTimeout = 6000;
    renderSetting.enablePreloading = true;
    renderSetting.useStyledLinearAds = false;
    renderSetting.useStyledNonLinearAds = false;
    renderSetting.disableUi = true;
    renderSetting.restoreCustomPlaybackStateOnAdBreakComplete = false;

    this.imaAdsManager = event.getAdsManager(videoElement);
    this.imaAdsManager.init(
      videoElement.clientWidth,
      videoElement.clientHeight,
      this.imaSdk.ViewMode.NORMAL
    );
    this.imaAdsManager.updateAdsRenderingSettings(renderSetting);
    this.updateSkipTime(this._skipTime_ || 0, "initAdsManager");
    this.imaAdsManager.start();
    Object.keys(this.imaSdk.AdEvent.Type).map((row, i) => {
      this.imaAdsManager.addEventListener(
        this.imaSdk.AdEvent.Type[row],
        (e) => {
          const adData = e.getAdData();
          if (!this.imaSdk) {
            this.clearAds();
            return;
          }
          switch (e.type) {
            case this.imaSdk.AdEvent.Type.AD_BREAK_READY:
              break;
            case this.imaSdk.AdEvent.Type.LOADED:
              const ignoreAdsTime = getValueFromObjectByKeys(
                NavigationService.getInstance().getStateRedux([
                  "Config",
                  "config",
                ]),
                ["ignoreAdsTime"]
              );
              this._currentTime_ = -1;
              this.timerLoaded = setTimeout(
                () => this.onContentResumeRequested(null, true),
                ignoreAdsTime || 6000
              );
              this.onAdLoaded(e);
              break;
            case this.imaSdk.AdEvent.Type.SKIPPABLE_STATE_CHANGED:
              break;
            case this.imaSdk.AdEvent.Type.CONTENT_RESUME_REQUESTED:
              this.onContentResumeRequested(e);
              break;
            case this.imaSdk.AdEvent.Type.CONTENT_PAUSE_REQUESTED:
              this.onContentPauseRequested(e);
              break;
            case this.imaSdk.AdEvent.Type.AD_BUFFERING:
              if (this.timerBuffering) {
                clearTimeout(this.timerBuffering);
                this.timerBuffering = undefined;
              }
              this.timerBuffering = setTimeout(
                () => this.onContentResumeRequested(),
                7000
              );
              break;
            case this.imaSdk.AdEvent.Type.ALL_ADS_COMPLETED:
              this.onContentResumeRequested(e, true);
              break;
            case this.imaSdk.AdErrorEvent.Type.AD_ERROR:
              this.onAdError(e);
              break;
            case this.imaSdk.AdEvent.Type.LOG:
              if (adData["adError"] && adData["adError"].getMessage) {
                this.emit("adError", adData["adError"].getMessage());
                this.onContentResumeRequested(e, true);
              }
              break;
            case this.imaSdk.AdEvent.Type.STARTED:
              this._currentTime_ = -1;
              break;
            case this.imaSdk.AdEvent.Type.PAUSED:
              if (this.timerBuffering) {
                clearTimeout(this.timerBuffering);
                this.timerBuffering = undefined;
              }
              break;
            case this.imaSdk.AdEvent.Type.RESUMED:
              if (this.timerBuffering) {
                clearTimeout(this.timerBuffering);
                this.timerBuffering = undefined;
              }
              this.timerBuffering = setTimeout(
                () => this.onContentResumeRequested(null, true),
                7000
              );
              break;
            case this.imaSdk.AdEvent.Type.AD_PROGRESS:
              const progressData = e.getAdData();
              if (progressData) {
                if (progressData.currentTime !== this._currentTime_) {
                  this._currentTime_ = progressData.currentTime;
                  if (progressData.currentTime > 0 && this.timerLoaded) {
                    clearTimeout(this.timerLoaded);
                    this.timerLoaded = undefined;
                  }
                  if (this.timerBuffering) {
                    clearTimeout(this.timerBuffering);
                    this.timerBuffering = undefined;
                  }
                  this.timerBuffering = setTimeout(
                    () =>
                      this.onContentResumeRequested(
                        null,
                        progressData.currentTime !== 0 ? false : true
                      ),
                    4000
                  );
                }
                const strData = `Quảng cáo ${progressData.adPosition}/${
                  progressData.totalAds
                } · ${formatTimeVideo({
                  seconds:
                    ~~(progressData.duration - progressData.currentTime) + 1,
                })}`;
                if (this._showAds_) {
                  this.emit("adProgress", strData, {
                    currentTime: progressData.currentTime,
                  });
                  if (progressData.currentTime > 0.5) {
                    this._ready_ = true;
                  }
                } else {
                  this.clearAds();
                  setTimeout(
                    () => this.onContentResumeRequested(event, true),
                    1000
                  );
                  return;
                }
              }
              if (this.timerPlayer) {
                clearTimeout(this.timerPlayer);
                this.timerPlayer = undefined;
              }
              break;
            case this.imaSdk.AdEvent.Type.COMPLETE:
              this.lastTimeAd = nowCustom();
              break;
            default:
              break;
          }
        },
        false
      );
      return null;
    });
  };

  onContentPauseRequested = (event) => {
    this._showAds_ = true;
    if (this._skipTime_)
      this.updateSkipTime(this._skipTime_, "onContentPauseRequested");
    this.emit("onContentPauseRequested", event);
    if (this.timerPlayer) {
      clearTimeout(this.timerPlayer);
      this.timerPlayer = undefined;
    }
  };

  onContentResumeRequested = (event, allAdsCompleted = false) => {
    this._ready_ = false;
    this.emit("adProgress", "", {
      resumeRequested: true,
    });
    this.updateSkipTime(0, "contentResumed");
    if (!this._showAds_ && !allAdsCompleted) return;
    this._showAds_ = false;
    const callback = () => {
      if (this.timerBuffering) {
        clearTimeout(this.timerBuffering);
        this.timerBuffering = undefined;
      }
      this.emit("onContentResumeRequested", event);
    };
    if (this.timerPlayer) {
      clearTimeout(this.timerPlayer);
      this.timerPlayer = undefined;
    }
    this.timerPlayer = setTimeout(callback, 1000);
  };

  onAdLoaded = (event) => {
    const adPodInfo = event.getAd().getAdPodInfo();
    const adData = event.getAdData();
    const skipTime = getSkipTime(event.getAd().getDescription());
    if (adPodInfo) {
      if (skipTime && skipTime < adPodInfo.getMaxDuration()) {
        this.updateSkipTime(skipTime, "adLoaded");
      } else {
        const skipTimeOffset = adData.skipTimeOffset;
        if (skipTimeOffset) {
          this.updateSkipTime(skipTimeOffset, "skipTimeOffset");
        } else {
          const adWrapperSystems = adData.adWrapperSystems || [];
          for (let i = 0; i < adWrapperSystems.length; i++) {
            const adWrapperSystem = adWrapperSystems[i];
            const skip = getSkipTime(adWrapperSystem);
            if (skip > 0) {
              this.updateSkipTime(skip, "adLoadedContent");
              break;
            }
          }
        }
      }
      // Nếu là preroll thì hiện màn đen chắn lên
    }
    if (!event.getAd().isLinear()) {
      this.onContentResumeRequested(event);
    }
  };

  onAdError = (adErrorEvent) => {
    if (this.imaAdsManager) {
      this.imaAdsManager.destroy();
    }
    this.onContentResumeRequested(null, true);
  };

  _init(cb) {
    loadImaSdk()
      .then((ima) => {
        cb && cb();
        this.imaSdk = ima;
      })
      .catch(() => {
        logger.log("SDK could not be loaded. Check your ad blocker!");
      });
  }

  pauseAds() {
    this.imaAdsManager && this.imaAdsManager.pause();
  }

  playAds() {
    this.imaAdsManager && this.imaAdsManager.resume();
  }

  clearContainer() {
    this.updateSkipTime(0, "clearContainer");
    this.emit("adProgress", "", {});
    if (this.imaAdDisplayContainer) {
      this.imaAdDisplayContainer.destroy();
      this.imaAdDisplayContainer = null;
    }
    if (this.imaAdsManager) {
      this.imaAdsManager.destroy();
      this.imaAdsManager = undefined;
    }
    this._showAds_ = false;
  }

  clearAds() {
    if (this.timerBuffering) {
      clearTimeout(this.timerBuffering);
      this.timerBuffering = undefined;
    }
    if (this.timerLoaded) {
      clearTimeout(this.timerLoaded);
      this.timerLoaded = undefined;
    }
    if (this.timerPlayer) {
      clearTimeout(this.timerPlayer);
      this.timerPlayer = undefined;
    }
    if (this.imaAdsManager) {
      this.imaAdsManager.destroy();
      this.imaAdsManager = undefined;
    }
    if (this.imaAdsLoader) {
      this.imaAdsLoader.destroy();
      this.imaAdsLoader = undefined;
    }
    this._showAds_ = false;
    this.updateSkipTime(0, "clearAds");
    this.emit("adProgress", "", {});
  }

  resetAds() {
    this.clearAds();
    this.emit("adReset");
  }

  destroy() {
    this.clearAds();
  }
}
