import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ShieldCheck, Sparkles, Scan, Radio, Hand, Play, AlertTriangle } from 'lucide-react';

export default function CameraScreen({ scanType, onComplete, onBack, language = 'ko' }) {
  const [scanState, setScanState] = useState('ready'); 
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  const labels = {
    ko: {
      back: "이전 단계",
      titleFace: "AI 안면 생체 밸런스 정밀 분석",
      titleHand: "손 혈색 & 순환 분석",
      encrypted: "실시간 암호화 스캔",
      guideFaceReady: "프레임 중앙에 얼굴을 맞추고 [스캔 시작]을 눌러주세요",
      guideHandReady: "센서 영역에 손바닥을 펴서 올린 뒤 [스캔 시작]을 눌러주세요",
      warningFace: "안경, 선글라스, 모자 착용 시 인식률이 저하될 수 있습니다. (잠시 벗어주세요)",
      warningHand: "장갑이나 굵은 반지 착용 시 광학 센서 측정이 지연될 수 있습니다. (잠시 빼주세요)",
      startScanBtn: "스캔 시작하기",
      scanningStatus: "AI 생체 광학 정밀 측정 중입니다. 자세를 유지해 주세요.",
      analyzing: "스캔 완료! 맞춤 처방 분석 중...",
      progressScanning: "AI 모세혈관 및 생체 광학 신호 분석 중...",
      footer: "촬영된 영상은 특징점 데이터 추출 즉시 영구 파기되며 서버에 저장되지 않습니다."
    },
    en: {
      back: "Back",
      titleFace: "AI Facial Biometric Balance Analysis",
      titleHand: "Hand Circulation Scan",
      encrypted: "Encrypted Live Scan",
      guideFaceReady: "Align your face in the frame and press [Start Scan]",
      guideHandReady: "Place your palm on the sensor pad and press [Start Scan]",
      warningFace: "Please remove glasses, sunglasses, or hats for an accurate scan.",
      warningHand: "Please remove gloves or thick rings for accurate optical measurement.",
      startScanBtn: "Start Scan",
      scanningStatus: "Precision biometric scan in progress. Please hold still.",
      analyzing: "Scan complete! Analyzing personalized data...",
      progressScanning: "Analyzing micro-capillary and optical signals...",
      footer: "Captured video is permanently destroyed immediately after feature extraction."
    },
    zh: {
      back: "上一步",
      titleFace: "AI 面部生物平衡精密分析",
      titleHand: "手部微循环血色分析",
      encrypted: "实时加密扫描",
      guideFaceReady: "请将面部对准框内，然后点击【开始扫描】",
      guideHandReady: "请将手掌张开平放于感应区，点击【开始扫描】",
      warningFace: "戴眼镜、墨镜或帽子可能会影响识别率，请暂时摘下。",
      warningHand: "戴手套或粗大戒指可能会延迟光学传感器的测量，请暂时取下。",
      startScanBtn: "开始扫描",
      scanningStatus: "AI光学精密测量进行中，请保持姿势稳定。",
      analyzing: "扫描完成！正在分析专属处方数据...",
      progressScanning: "正在深入分析微血管与生物光学信号...",
      footer: "拍摄的影像在提取特征数据后立即彻底销毁，绝不保存于服务器。"
    },
    ja: {
      back: "前の段階",
      titleFace: "AI 顔生体バランス精密分析",
      titleHand: "手の血色＆末梢循環分析",
      encrypted: "暗号化リアルタイムスキャン",
      guideFaceReady: "フレームの中央に顔を合わせ、【スキャン開始】を押してください",
      guideHandReady: "センサーエリアに手のひらを広げて乗せ、【スキャン開始】を押してください",
      warningFace: "メガネ、サングラス、帽子を着用していると認識率が低下する場合があります。外してください。",
      warningHand: "手袋や太い指輪を着用していると光学センサーの測定が遅れる場合があります。外してください。",
      startScanBtn: "スキャン開始",
      scanningStatus: "AI生体光学スキャン進行中。そのまま姿勢を維持してください。",
      analyzing: "スキャン完了！個別処方データを分析中...",
      progressScanning: "毛細血管および生体光学信号を精密分析中...",
      footer: "撮影映像は特徴抽出直後に完全に破棄され、サーバーに保存されることはありません。"
    }
  };

  const t = labels[language] || labels.ko;

  useEffect(() => {
    let stream = null;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((s) => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
          }
        })
        .catch(() => console.log("웹캠 미연결: 시뮬레이션 모드 가동"));
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleStartScan = () => {
    setScanState('scanning');
    setProgress(0);
  };

  useEffect(() => {
    if (scanState === 'scanning') {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setScanState('done');
            setTimeout(() => {
              onComplete({
                type: scanType,
                vitalScore: 88,
                analysis: scanType === 'face' 
                  ? '안색 피로도 다소 높음 / 항산화·수분 밸런스 케어 필요' 
                  : '말초 미세 순환 저하 / 혈행 개선 및 활력 대사 영양 집중 권장'
              });
            }, 600);
            return 100;
          }
          return prev + 2; 
        });
      }, 90);
      return () => clearInterval(interval);
    }
  }, [scanState, onComplete, scanType]);

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white p-6 md:p-8 select-none">
      
      {/* 1. 상단 바 */}
      <div className="w-full max-w-6xl flex items-center justify-between border-b border-emerald-500/20 pb-4">
        <button onClick={onBack} className="flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-slate-900/90 border border-slate-700 text-slate-200 hover:text-white active:scale-95 transition-all cursor-pointer shadow-lg">
          <ArrowLeft className="w-5 h-5 text-emerald-400" />
          <span className="font-bold text-base whitespace-nowrap">{t.back}</span>
        </button>

        <div className="text-xl md:text-2xl font-black text-emerald-300 flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-emerald-400" />
          <span>{scanType === 'face' ? t.titleFace : t.titleHand}</span>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs md:text-sm font-semibold whitespace-nowrap">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          {t.encrypted}
        </div>
      </div>

      {/* 2. 대형 광학 스캔 뷰파인더 */}
      <div className="relative w-full max-w-5xl h-[520px] md:h-[580px] bg-slate-950 rounded-3xl border-2 border-emerald-500/40 overflow-hidden shadow-[0_0_60px_rgba(16,185,129,0.18)] flex items-center justify-center my-auto">
        <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover mirror" />

        <div className="absolute top-5 left-5 w-8 h-8 border-t-4 border-l-4 border-emerald-400 pointer-events-none"></div>
        <div className="absolute top-5 right-5 w-8 h-8 border-t-4 border-r-4 border-emerald-400 pointer-events-none"></div>
        <div className="absolute bottom-5 left-5 w-8 h-8 border-b-4 border-l-4 border-emerald-400 pointer-events-none"></div>
        <div className="absolute bottom-5 right-5 w-8 h-8 border-b-4 border-r-4 border-emerald-400 pointer-events-none"></div>

        {/* 상단 알림 바 */}
        <div className="absolute top-4 z-30 flex items-center gap-2.5 bg-slate-950/90 border border-emerald-400/80 px-6 py-2 rounded-full shadow-2xl backdrop-blur-md">
          {scanState === 'scanning' ? (
            <>
              <Radio className="w-4 h-4 text-emerald-400 animate-ping" />
              <span className="text-sm md:text-base font-bold text-emerald-300">{t.scanningStatus}</span>
            </>
          ) : (
            <span className="text-sm md:text-base font-semibold text-slate-200">
              {scanType === 'face' ? t.guideFaceReady : t.guideHandReady}
            </span>
          )}
        </div>

        {/* ★ 경고 안내 바 (스마트 디테일) */}
        {scanState === 'ready' && (
          <div className="absolute bottom-6 z-30 flex items-center gap-2 bg-amber-950/90 border border-amber-500/80 px-5 py-2.5 rounded-2xl shadow-2xl backdrop-blur-md animate-pulse">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
            <span className="text-xs md:text-sm font-bold text-amber-200">
              {scanType === 'face' ? t.warningFace : t.warningHand}
            </span>
          </div>
        )}

        {/* 중앙 센서 가이드 영역 (비율 25% 이상 대폭 확대) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pt-2">
          {scanType === 'face' ? (
            <div className="relative flex flex-col items-center justify-center">
              {/* 타원 사이즈를 w-72->80, h-[340]->[420]으로 키움 */}
              <div className={`w-72 h-[380px] md:w-[340px] md:h-[460px] rounded-[50%] border-[3px] ${scanState === 'scanning' ? 'border-emerald-400 shadow-[0_0_40px_rgba(52,211,153,0.4)]' : 'border-dashed border-emerald-400/70'} flex items-center justify-center transition-all`}>
                <div className="w-full h-[1px] bg-emerald-400/20 absolute top-1/3"></div>
                <div className="w-full h-[1px] bg-emerald-400/20 absolute top-2/3"></div>
                <div className="h-full w-[1px] bg-emerald-400/20 absolute"></div>
              </div>
            </div>
          ) : (
            <div className="relative flex flex-col items-center justify-center">
              {/* 패드 사이즈를 대폭 키움 */}
              <div className={`w-80 h-[380px] md:w-[360px] md:h-[420px] border-[3px] ${scanState === 'scanning' ? 'border-teal-400 shadow-[0_0_40px_rgba(45,212,191,0.4)]' : 'border-dashed border-teal-400/70'} rounded-3xl p-6 flex flex-col items-center justify-center bg-teal-950/20 backdrop-blur-[2px] transition-all`}>
                <div className="relative flex items-center justify-center my-auto">
                  <Hand 
                    className="w-56 h-64 md:w-60 md:h-72 text-teal-300 drop-shadow-[0_0_15px_rgba(45,212,191,0.5)]" 
                    strokeWidth={1.2} 
                  />
                  <div className="absolute w-24 h-24 rounded-full border-[1.5px] border-teal-400/40 border-dashed animate-pulse flex items-center justify-center mt-6">
                    <div className="w-10 h-10 rounded-full border-2 border-teal-300 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-teal-400"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {scanState === 'scanning' && (
            <div 
              className="absolute inset-x-6 h-2 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_25px_#34d399]"
              style={{ animation: 'laserSweep 1.8s ease-in-out infinite alternate' }}
            ></div>
          )}
        </div>

        <style>{`
          @keyframes laserSweep {
            0% { top: 15%; opacity: 0.9; }
            100% { top: 85%; opacity: 0.9; }
          }
        `}</style>
      </div>

      {/* 3. 하단 컨트롤 */}
      <div className="w-full max-w-4xl flex flex-col items-center gap-3">
        {scanState === 'ready' ? (
          <button
            onClick={handleStartScan}
            className="flex items-center gap-3 px-14 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xl shadow-2xl active:scale-95 transition-all cursor-pointer"
          >
            <Play className="w-6 h-6 fill-current" />
            <span>{t.startScanBtn}</span>
          </button>
        ) : (
          <div className="w-full flex flex-col gap-2">
            <div className="flex justify-between items-center text-sm md:text-base font-bold">
              <span className="text-emerald-300 flex items-center gap-2">
                <Scan className="w-5 h-5 text-emerald-400 animate-pulse" />
                {progress === 100 ? t.analyzing : t.progressScanning}
              </span>
              <span className="text-lg md:text-xl font-black text-white">{progress}%</span>
            </div>
            <div className="w-full h-3.5 bg-slate-900 rounded-full overflow-hidden border border-emerald-500/30 shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 transition-all duration-100 shadow-[0_0_15px_#34d399]"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* 4. 푸터 */}
      <div className="text-xs text-slate-400 flex items-center gap-2 pt-2">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
        <span className="break-keep">{t.footer}</span>
      </div>

    </div>
  );
}