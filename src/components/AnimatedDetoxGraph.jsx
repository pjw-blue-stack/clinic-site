import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function AnimatedDetoxGraph() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Toxin Line path
  const toxinPath = "M 0 150 L 350 100 L 750 400 L 1000 400";
  
  // Wave Path (Sweat)
  const sweatPath = "M 0 150 L 0 150 L 5 164.27132553198823 L 10 177.8848757889427 L 15 189.92399204715434 L 20 199.5544784823204 L 25 206.07903321663684 L 30 208.98396772174289 L 35 207.97510059993198 L 40 203.00034813217258 L 45 194.2573396829846 L 50 182.18531232683142 L 55 167.44152861604027 L 60 150.8634519674311 L 65 133.4188423573984 L 70 116.14674051710585 L 75 100.09293814338213 L 80 86.24394175299469 L 85 75.46359902635018 L 90 68.43645458696747 L 95 65.62153952403034 L 100 67.21969466691868 L 105 73.15671647328537 L 110 83.08364494432013 L 115 96.39444461719711 L 120 112.26022898990774 L 125 129.67811534218148 L 130 147.5318391082879 L 135 164.66046727945232 L 140 179.93098150262796 L 145 192.31019302145242 L 150 200.9314267797656 L 155 205.15167654806856 L 160 204.59547416423044 L 165 199.18250343601653 L 170 189.1369763740944 L 175 174.97791630033538 L 180 157.49068938233583 L 185 137.68131824229803 L 190 116.71622272797788 L 195 95.85099206765291 L 200 76.35253652630936 L 205 59.419445234799916 L 210 46.10555616237971 L 215 37.25160888442261 L 220 33.429405270825825 L 225 34.90217164189187 L 230 41.603840926884175 L 235 53.13881352815437 L 240 68.8024820262477 L 245 87.6214967616608 L 250 108.4114890917508 L 255 129.8488371442611 L 260 150.55212844673292 L 265 169.16830631970382 L 270 184.45812789811868 L 275 195.37553762821736 L 280 201.13587672392808 L 285 201.26849050486146 L 290 195.6502251717276 L 295 184.51746811803991 L 300 168.4557106433853 L 305 148.36701713354603 L 310 125.41718256206403 L 315 100.96566213899129 L 320 76.48247970491654 L 325 53.45719202338366 L 330 33.30554654564568 L 335 17.279681529737275 L 340 6.387562231335238 L 345 1.3268308477121167 L 350 2.4373994531842413 L 355 15.540421847439518 L 360 33.903249816375734 L 365 56.51523731570004 L 370 82.1218606269172 L 375 109.30780304460943 L 380 136.58845770831752 L 385 162.5039414339132 L 390 185.7096680142033 L 395 205.05786171403034 L 400 219.6650725654865 L 405 228.96173492929563 L 410 232.72102189653435 L 415 231.06560927522577 L 420 224.45238491410083 L 425 213.6365305298881 L 430 199.61767625991249 L 435 183.57190429445538 L 440 166.7741926381869 L 445 150.51639670338403 L 450 136.02603900315924 L 455 124.39101148159455 L 460 116.4948084743367 L 465 112.96613858289878 L 470 114.14576587356588 L 475 120.07227327786825 L 480 130.48720121150984 L 485 144.85877327090776 L 490 162.42225784971106 L 495 182.23400241032786 L 500 203.23537749315588 L 505 224.3223269308311 L 510 244.41596807350743 L 515 262.52973087027925 L 520 277.8288577316538 L 525 289.6786791798104 L 530 297.6788891586507 L 535 301.6820113316959 L 540 301.7953075610792 L 545 298.3664613543349 L 550 291.9544018993059 L 555 283.2875526700125 L 560 273.2125357218564 L 565 262.63689441000054 L 570 252.4696841495394 L 575 243.56381043922536 L 580 236.66377025249975 L 585 232.36199805070603 L 590 231.06636676616642 L 595 232.9805948144778 L 600 238.0984187953569 L 605 246.21146898402472 L 610 256.9298925060503 L 615 269.7139652026879 L 620 283.914268315139 L 625 298.8175204431889 L 630 313.69487605043685 L 635 327.84944194951055 L 640 340.659920612151 L 645 351.6176472597966 L 650 360.35481694183323 L 655 366.6623579264066 L 660 370.49665068407614 L 665 371.97506517565466 L 670 371.3610400060903 L 675 369.0401051333397 L 680 365.4888113280808 L 685 361.23893965320843 L 690 356.8395992993576 L 695 352.81987118978236 L 700 349.6545199151155 L 705 347.73499243502914 L 710 347.3474745460666 L 715 348.65922056461886 L 720 351.713749810479 L 725 356.43486064635965 L 730 362.6387946914871 L 735 370.05333316198875 L 740 378.342161066146 L 745 387.13252188899116 L 750 396.04402400727076 L 755 401.0173239279861 L 760 405.9273715741877 L 765 410.468883964664 L 770 414.3594918554329 L 775 417.35729609169954 L 780 419.27590772568175 L 785 419.9960367786229 L 790 419.47290911389956 L 795 417.7390502759765 L 800 414.902263209587 L 805 411.1389255947642 L 810 406.6830235369684 L 815 401.8116034443424 L 820 396.82754662390585 L 825 392.0407375888666 L 830 387.7487969404906 L 835 384.2185767606172 L 840 381.66956904168734 L 845 380.2602587377458 L 850 380.0782699376081 L 855 381.1349178234185 L 860 383.364505147428 L 865 386.62840696866056 L 870 390.72368968032345 L 875 395.3957284385849 L 880 400.35403850210827 L 885 405.29033616632813 L 890 409.89770635105253 L 895 413.8896850936302 L 900 417.01807049068236 L 905 419.08835469030885 L 910 419.9718174482354 L 915 419.6135293291565 L 920 418.0357669529762 L 925 415.33662794247743 L 930 411.6839316882657 L 935 407.3047851518811 L 940 402.4714624549045 L 945 397.48447619281575 L 950 392.6538930173162 L 955 388.2800551937089 L 960 384.63490677352667 L 965 381.9450854305469 L 970 380.37783122793803 L 975 380.0305884411461 L 980 380.9249469448106 L 985 383.00529985892865 L 990 386.1423009153261 L 995 390.14090658213377 L 1000 394.7525029259214";

  // Sequence Mappings for Toxin and Sweat
  // Segment points: Rise (0.32), Fall (0.77), Maintain (1.0)
  const toxinProgress = useTransform(
    scrollYProgress, 
    [0, 0.12, 0.38, 0.48, 0.72, 0.82, 1], 
    [0, 0.32, 0.32, 0.77, 0.77, 1, 1]
  );
  
  const sweatProgress = useTransform(
    scrollYProgress, 
    [0, 0.12, 0.24, 0.48, 0.58, 0.82, 0.92, 1], 
    [0, 0, 0.437, 0.437, 0.864, 0.864, 1, 1]
  );

  // Markers Opacity & Position
  const startMarkerOpacity = useTransform(scrollYProgress, [0.24, 0.26, 1], [0, 1, 1]);
  const startMarkerY = useTransform(scrollYProgress, [0.24, 0.26], [20, 0]);
  
  const endMarkerOpacity = useTransform(scrollYProgress, [0.58, 0.60, 1], [0, 1, 1]);
  const endMarkerY = useTransform(scrollYProgress, [0.58, 0.60], [20, 0]);
  
  // Arrow Head Opacity (appears at the very end when Toxin finishes)
  const arrowOpacity = useTransform(scrollYProgress, [0.92, 0.94, 1], [0, 1, 1]);
  
  // Note Box Opacities (Fading in and out with smoother 4% crossfades)
  const note1Opacity = useTransform(scrollYProgress, [0, 0.05, 0.24, 0.28], [0, 1, 1, 0]);
  const note1_5Opacity = useTransform(scrollYProgress, [0.24, 0.28, 0.34, 0.38], [0, 1, 1, 0]); // 치료 시작
  const note2Opacity = useTransform(scrollYProgress, [0.34, 0.38, 0.58, 0.62], [0, 1, 1, 0]);
  const note2_5Opacity = useTransform(scrollYProgress, [0.58, 0.62, 0.68, 0.72], [0, 1, 1, 0]); // 치료 종료 & 사후 관리 시작
  const note3Opacity = useTransform(scrollYProgress, [0.68, 0.72, 1], [0, 1, 1]);

  // Line 2 Opacities for staggered appearance (syncs with Sweat line drawing)
  const note1Line2Opacity = useTransform(scrollYProgress, [0.12, 0.17], [0, 1]);
  const note2Line2Opacity = useTransform(scrollYProgress, [0.43, 0.48], [0, 1]);
  const note3Line2Opacity = useTransform(scrollYProgress, [0.78, 0.83], [0, 1]);

  // Common Note Box Styles
  const noteBoxStyle = {
    position: 'absolute', 
    left: '0', 
    top: '0', 
    width: '100%',
    background: 'rgba(255,255,255,0.95)',
    backdropFilter: 'blur(5px)',
    padding: '16px 24px',
    borderRadius: '16px',
    border: '1px solid rgba(77, 172, 255, 0.3)',
    color: 'var(--text-main)',
    boxShadow: '0 10px 20px rgba(77, 172, 255, 0.1)',
    wordBreak: 'keep-all',
    textAlign: 'center'
  };

  return (
    <div ref={containerRef} style={{ height: '700vh', position: 'relative', width: '100%', maxWidth: '1000px', margin: '60px auto 0' }}>
      <div style={{ position: 'sticky', top: '10vh', height: '80vh', width: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        
        <div style={{ width: '100%', maxWidth: '1000px', background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(12px)', borderRadius: '24px', padding: '5% 4%', border: '1px solid rgba(77, 172, 255, 0.2)', boxShadow: '0 20px 40px rgba(77, 172, 255, 0.1)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Header/Legend */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '15px' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)', margin: 0, fontWeight: 'bold', color: 'var(--primary-dark)', wordBreak: 'keep-all' }}>
              치료 경과에 따른 독소와 땀양의 상관관계
            </h2>
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '25px', height: '4px', background: '#ff4d6d', borderRadius: '2px' }}></div>
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-main)', wordBreak: 'keep-all' }}>독소 양</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '25px', height: '4px', background: '#4dacff', borderRadius: '2px' }}></div>
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-main)', wordBreak: 'keep-all' }}>땀의 양</span>
              </div>
            </div>
          </div>

          {/* Dynamic Note Boxes Container in Document Flow */}
          <div style={{ position: 'relative', width: '100%', minHeight: '140px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '700px' }}>
              {/* Note 1 */}
              <motion.div style={{ ...noteBoxStyle, opacity: note1Opacity, position: 'absolute', top: 0, left: 0, width: '100%', boxSizing: 'border-box' }}>
                <div style={{ margin: 0, fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', lineHeight: '1.6', wordBreak: 'keep-all', color: 'var(--text-main)' }}>
                  <div>
                    <span style={{ color: '#ff4d6d', fontWeight: 'bold' }}>독소</span>가 증가 <span style={{color: '#ff4d6d', fontWeight: 'bold'}}>↑</span> 할수록,
                  </div>
                  <motion.div style={{ opacity: note1Line2Opacity }}>
                    <span style={{ color: '#4dacff', fontWeight: 'bold' }}>땀</span>의 양도 증가 <span style={{color: '#4dacff', fontWeight: 'bold'}}>↑</span> 합니다.
                  </motion.div>
                </div>
              </motion.div>
              {/* Note 1.5 (치료 시작) */}
              <motion.div style={{ ...noteBoxStyle, opacity: note1_5Opacity, position: 'absolute', top: 0, left: 0, width: '100%', boxSizing: 'border-box' }}>
                <p style={{ margin: 0, fontSize: 'clamp(1.1rem, 3vw, 1.6rem)', lineHeight: '2.5', fontWeight: 'bold', color: '#40C057' }}>
                  치료 시작
                </p>
              </motion.div>
              {/* Note 2 */}
              <motion.div style={{ ...noteBoxStyle, opacity: note2Opacity, position: 'absolute', top: 0, left: 0, width: '100%', boxSizing: 'border-box' }}>
                <div style={{ margin: 0, fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', lineHeight: '1.6', wordBreak: 'keep-all', color: 'var(--text-main)' }}>
                  <div>
                    <span style={{ color: '#ff4d6d', fontWeight: 'bold' }}>독소</span>가 감소 <span style={{color: '#ff4d6d', fontWeight: 'bold'}}>↓</span> 할수록,
                  </div>
                  <motion.div style={{ opacity: note2Line2Opacity }}>
                    <span style={{ color: '#4dacff', fontWeight: 'bold' }}>땀</span>의 양도 감소 <span style={{color: '#4dacff', fontWeight: 'bold'}}>↓</span> 합니다.
                  </motion.div>
                </div>
              </motion.div>
              {/* Note 2.5 (치료 종료 & 사후 관리 시작) */}
              <motion.div style={{ ...noteBoxStyle, opacity: note2_5Opacity, position: 'absolute', top: 0, left: 0, width: '100%', boxSizing: 'border-box' }}>
                <p style={{ margin: 0, fontSize: 'clamp(1.1rem, 3vw, 1.6rem)', lineHeight: '2.5', fontWeight: 'bold', color: '#40C057' }}>
                  치료 종료 &amp; 사후 관리 시작
                </p>
              </motion.div>
              {/* Note 3 */}
              <motion.div style={{ ...noteBoxStyle, opacity: note3Opacity, position: 'absolute', top: 0, left: 0, width: '100%', boxSizing: 'border-box' }}>
                <div style={{ margin: 0, fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', lineHeight: '1.6', wordBreak: 'keep-all', color: 'var(--text-main)' }}>
                  <div>
                    <span style={{ color: '#ff4d6d', fontWeight: 'bold' }}>독소</span>를 낮게 유지 <span style={{color: '#ff4d6d', fontWeight: 'bold'}}>→</span> 하면,
                  </div>
                  <motion.div style={{ opacity: note3Line2Opacity }}>
                    <span style={{ color: '#4dacff', fontWeight: 'bold' }}>땀양</span>도 호전된 상태에서 잘 유지 <span style={{color: '#4dacff', fontWeight: 'bold'}}>→</span> 됩니다.
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          <svg viewBox="-60 -30 1120 540" style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
            {/* Grid & Axes */}
            <g stroke="rgba(0, 0, 0, 0.1)" strokeWidth="1">
              <line x1="0" y1="450" x2="1000" y2="450" strokeWidth="2" stroke="rgba(0,0,0,0.3)" />
              <line x1="0" y1="0" x2="0" y2="450" strokeWidth="2" stroke="rgba(0,0,0,0.3)" />
              {/* Arrow heads */}
              <polygon points="1000,445 1010,450 1000,455" fill="rgba(0,0,0,0.3)" />
              <polygon points="-5,10 0,0 5,10" fill="rgba(0,0,0,0.3)" />
            </g>

            {/* Axis Labels */}
            <text x="1000" y="485" fill="var(--text-light)" fontSize="26" textAnchor="end" fontWeight="bold">시간</text>
            <text x="-20" y="20" fill="#ff4d6d" fontSize="26" textAnchor="end" fontWeight="bold">독소 양</text>
            <text x="1020" y="20" fill="#4dacff" fontSize="26" textAnchor="start" fontWeight="bold">땀 양</text>
            
            <g stroke="rgba(0, 0, 0, 0.1)" strokeWidth="1">
              <line x1="1000" y1="0" x2="1000" y2="450" strokeWidth="2" stroke="rgba(0,0,0,0.2)" strokeDasharray="5,5" />
              <polygon points="995,10 1000,0 1005,10" fill="rgba(0,0,0,0.2)" />
            </g>

            {/* Toxin Line (Animated) - Drawn under sweat line */}
            <motion.path
              d={toxinPath}
              fill="transparent"
              stroke="#ff4d6d"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                pathLength: toxinProgress,
                filter: 'drop-shadow(0px 4px 6px rgba(255, 77, 109, 0.3))'
              }}
            />
            {/* Arrow Head for Toxin Line (fades in at the end) */}
            <motion.polygon 
              points="975,385 1005,400 975,415" 
              fill="#ff4d6d"
              style={{ opacity: arrowOpacity }}
            />

            {/* Sweat Line (Animated) */}
            <motion.path
              d={sweatPath}
              fill="transparent"
              stroke="#4dacff"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                pathLength: sweatProgress,
                filter: 'drop-shadow(0px 4px 6px rgba(77, 172, 255, 0.3))'
              }}
            />

            {/* Marker 1: 치료 시작 (Light Green, below the peak) */}
            {/* Peak is at x=350, y=100. We place box at y=310, pointing UP to 100 */}
            <motion.g style={{ opacity: startMarkerOpacity, y: startMarkerY }}>
              <line x1="350" y1="310" x2="350" y2="105" stroke="#40C057" strokeWidth="4" strokeDasharray="6,6" />
              <polygon points="342,120 350,105 358,120" fill="#40C057" />
              <foreignObject x="250" y="310" width="200" height="80" style={{ overflow: 'visible' }}>
                <div style={{ background: '#40C057', color: '#fff', padding: '12px 24px', borderRadius: '30px', fontWeight: 'bold', fontSize: '1.4rem', boxShadow: '0 4px 15px rgba(64, 192, 87, 0.4)', textAlign: 'center', whiteSpace: 'nowrap' }}>
                  치료 시작
                </div>
              </foreignObject>
            </motion.g>

            {/* Marker 2: 치료 종료 (Green, above the valley) */}
            {/* Valley is at x=750, y=400. We place box at y=160, pointing DOWN to 400 */}
            <motion.g style={{ opacity: endMarkerOpacity, y: endMarkerY }}>
              <line x1="750" y1="220" x2="750" y2="395" stroke="#40C057" strokeWidth="4" strokeDasharray="6,6" />
              <polygon points="742,380 750,395 758,380" fill="#40C057" />
              <foreignObject x="610" y="160" width="280" height="80" style={{ overflow: 'visible' }}>
                <div style={{ background: '#40C057', color: '#fff', padding: '12px 24px', borderRadius: '30px', fontWeight: 'bold', fontSize: '1.4rem', boxShadow: '0 4px 15px rgba(64, 192, 87, 0.4)', textAlign: 'center', whiteSpace: 'nowrap' }}>
                  치료 종료 &amp; 사후 관리
                </div>
              </foreignObject>
            </motion.g>
          </svg>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          style={{ 
            marginTop: '20px',
            color: 'var(--text-light)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            opacity: useTransform(scrollYProgress, [0, 0.05, 1], [1, 0, 0])
          }}
        >
          <p style={{ marginBottom: '8px', fontWeight: 'bold', fontSize: '0.9rem' }}>아래로 스크롤하여 변화를 확인하세요</p>
          <div style={{ width: '24px', height: '40px', border: '2px solid var(--text-light)', borderRadius: '12px', position: 'relative' }}>
            <motion.div 
              style={{ width: '4px', height: '4px', background: 'var(--text-light)', borderRadius: '50%', position: 'absolute', left: '8px' }}
              animate={{ top: ['8px', '24px', '8px'] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
