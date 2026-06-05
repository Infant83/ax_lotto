import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import { Ticket, RotateCcw, Sparkles, Feather } from 'lucide-react';

export default function App() {
  const [totalParticipants, setTotalParticipants] = useState<number>(100);
  const [participants, setParticipants] = useState<number[]>(Array.from({ length: 100 }, (_, i) => i + 1));
  const [winners, setWinners] = useState<number[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);

  useEffect(() => {
    // Reset when total changes but only if no winners drawn
    if (winners.length === 0) {
      const newParticipants = Array.from({ length: totalParticipants }, (_, i) => i + 1);
      setParticipants(newParticipants);
      setCurrentNumber(null);
    }
  }, [totalParticipants, winners.length]);

  const drawTicket = () => {
    if (participants.length === 0) {
      alert("모든 인원이 선발되었습니다!");
      return;
    }

    setIsDrawing(true);
    let count = 0;
    
    const shuffleInterval = setInterval(() => {
      const temp = participants[Math.floor(Math.random() * participants.length)];
      setCurrentNumber(temp);
      count++;

      if (count > 20) {
        clearInterval(shuffleInterval);
        
        // Finalize using closure variables to avoid StrictMode double-invocation bugs
        const finalRandomIndex = Math.floor(Math.random() * participants.length);
        const luckyOne = participants[finalRandomIndex];
        
        setCurrentNumber(luckyOne);
        setWinners(prevWinners => [luckyOne, ...prevWinners]);
        setParticipants(prev => prev.filter(p => p !== luckyOne));
        
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#1A535C', '#F7FFF7'] 
        });

        setIsDrawing(false);
      }
    }, 50);
  };

  const resetDraw = () => {
    if (confirm("추첨 기록을 모두 초기화하시겠습니까?")) {
      setParticipants(Array.from({ length: totalParticipants }, (_, i) => i + 1));
      setWinners([]);
      setCurrentNumber(null);
    }
  };

  const handleTotalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val)) {
      setTotalParticipants(Math.max(1, val));
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden font-sans flex flex-col items-center justify-center p-4 sm:p-10 text-[#0d2111] bg-[#f8f9e9]">
      {/* Brutalist Watercolor Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Watercolor Stains/Blobs */}
        <div className="absolute -top-[5%] -left-[5%] w-[50%] h-[60%] rounded-full bg-[#4ECDC4]/50 blur-[80px] mix-blend-multiply opacity-80" />
        <div className="absolute top-[30%] -right-[10%] w-[40%] h-[50%] rounded-full bg-[#FFE66D]/60 blur-[100px] mix-blend-multiply opacity-80" />
        <div className="absolute -bottom-[10%] left-[20%] w-[60%] h-[50%] rounded-[100%] bg-[#FF6B6B]/40 blur-[90px] mix-blend-multiply opacity-80" />
        
        {/* Halftone / Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: "radial-gradient(#0d2111 2px, transparent 2px)", backgroundSize: "30px 30px" }} />
      </div>
      
      {/* Main Layout Container */}
      <div className="z-10 w-full max-w-6xl mx-auto flex flex-col items-center h-[90vh] min-h-[700px] justify-center">
        
        {/* Header - Brutalist */}
        <div className="mb-10 text-center text-[#0d2111] flex flex-col items-center relative z-10 w-full">
          <div className="bg-[#4ECDC4] border-[3px] border-[#0d2111] shadow-[4px_4px_0_0_#0d2111] px-5 py-2 rounded-xl font-black text-sm tracking-[0.2em] mb-4 flex items-center justify-center gap-2 transform -rotate-2">
            <Sparkles size={16} className="text-[#FFE66D]" />
            LG ARTS CENTER SEOUL
            <Sparkles size={16} className="text-[#FFE66D]" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-[#0d2111] break-keep font-serif drop-shadow-[2px_2px_0_rgba(255,255,255,1)]">
            LG그룹 임직원 특별초청공연
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center font-bold text-base md:text-lg tracking-wide bg-white border-[3px] border-[#0d2111] shadow-[4px_4px_0_0_#0d2111] py-3 px-8 rounded-2xl transform rotate-1">
            <span className="text-[#FF6B6B]">국립 심포니오케스트라 콘서트</span>
            <span className="hidden sm:inline text-[#0d2111]">|</span>
            <span className="text-[#1A535C]">파우스트 선우예권 협연</span>
          </div>
        </div>

        {/* Grid for aligned cards */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-stretch flex-1 min-h-0">
          
          {/* Left/Main Column: Brutalist Machine */}
          <div className="lg:col-span-2 flex flex-col w-full h-full">
            <div className="w-full h-full bg-[#f7fff7] border-[4px] border-[#0d2111] shadow-[12px_12px_0_0_#0d2111] rounded-[2rem] p-8 md:p-10 relative flex flex-col items-center justify-center min-h-[400px] overflow-hidden">
              
              {/* Abstract decorative shapes inside */}
              <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#FFE66D] rounded-full mix-blend-multiply blur-[40px] opacity-60" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#4ECDC4] rounded-full mix-blend-multiply blur-[40px] opacity-60" />

              {/* Settings row */}
              <div className="flex justify-center mb-8 relative z-10 w-full mt-4">
                <label className="flex items-center space-x-3 bg-white border-[3px] border-[#0d2111] shadow-[4px_4px_0_0_#0d2111] px-6 py-2 rounded-xl font-black text-[#1A535C]">
                  <span className="text-sm tracking-widest">초청 인원</span>
                  <input 
                    type="number" 
                    value={totalParticipants} 
                    onChange={handleTotalChange}
                    className="w-20 bg-transparent border-b-4 border-[#FF6B6B] focus:outline-none focus:border-[#4ECDC4] text-center font-sans text-2xl text-[#0d2111] px-1 transition-colors"
                    disabled={winners.length > 0}
                  />
                  <span className="text-sm">명</span>
                </label>
              </div>

              {/* Display Screen */}
              <div className="relative mx-auto w-48 h-48 sm:w-64 sm:h-64 md:w-[280px] md:h-[280px] bg-white border-[6px] border-[#0d2111] rounded-full flex items-center justify-center shadow-[inset_6px_6px_0_rgba(0,0,0,0.1),8px_8px_0_0_#0d2111] overflow-hidden mb-10 bg-[url('data:image/svg+xml,%3Csvg width=%2220%22 height=%2220%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M0 0h20v20H0z%22 fill=%22%23fff%22/%3E%3Ccircle cx=%2210%22 cy=%2210%22 r=%221%22 fill=%22%230d2111%22 opacity=%220.2%22/%3E%3C/svg%3E')] transform transition-transform hover:-rotate-3 duration-300">
                
                {isDrawing && (
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#FF6B6B]/40 to-[#FFE66D]/40 mix-blend-multiply animate-pulse" />
                )}

                {/* Number presentation */}
                <span className={`z-10 font-sans font-black leading-none transition-all duration-100 ease-out ${
                  isDrawing 
                    ? 'text-[80px] md:text-[140px] text-[#0d2111] opacity-50 blur-[2px] scale-90' 
                    : currentNumber !== null
                      ? 'text-[90px] md:text-[150px] text-[#FF6B6B] drop-shadow-[4px_4px_0_#0d2111] scale-110'
                      : 'text-[80px] md:text-[130px] text-[#0d2111]/20'
                }`}>
                  {currentNumber ?? '?'}
                </span>
              </div>

              {/* Action Button */}
              <div className="flex flex-col items-center gap-6 relative z-10 w-full pb-4">
                <motion.button 
                  whileHover={{ scale: 1.02, x: -2, y: -2 }}
                  whileTap={{ scale: 0.98, x: 2, y: 2 }}
                  onClick={drawTicket}
                  disabled={isDrawing || participants.length === 0}
                  className="relative group disabled:opacity-50 disabled:cursor-not-allowed outline-none w-full max-w-[18rem]"
                >
                  <div className="relative bg-[#FFE66D] text-[#0d2111] font-black text-xl md:text-2xl py-4 rounded-2xl border-[4px] border-[#0d2111] shadow-[6px_6px_0_0_#0d2111] flex justify-center items-center gap-3 transition-all duration-200 group-hover:shadow-[8px_8px_0_0_#0d2111] group-active:shadow-[0px_0px_0_0_#0d2111] group-active:translate-x-[6px] group-active:translate-y-[6px]">
                    <Feather size={24} className="text-[#FF6B6B]" />
                    <span className="tracking-widest">1명씩 뽑기!</span>
                  </div>
                </motion.button>
                
                <button 
                  onClick={resetDraw}
                  disabled={isDrawing}
                  className="flex items-center gap-1.5 text-[#0d2111] hover:bg-[#FF6B6B] hover:text-white transition-all duration-200 px-5 py-2 rounded-xl font-bold text-sm tracking-widest border-[2px] border-[#0d2111] shadow-[2px_2px_0_0_#0d2111] hover:shadow-[4px_4px_0_0_#0d2111]"
                >
                  <RotateCcw size={14} />
                  <span>기록 리셋</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Brutalist Winners Board */}
          <div className="lg:col-span-1 flex flex-col h-[500px] lg:h-full">
            <div className="bg-[#f7fff7] rounded-[2rem] border-[4px] border-[#0d2111] p-8 shadow-[12px_12px_0_0_#0d2111] flex-1 flex flex-col relative overflow-hidden">
              
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#4ECDC4]/50 rounded-full blur-[30px] pointer-events-none mix-blend-multiply" />

              <div className="flex items-center gap-3 mb-6 pb-4 border-b-[4px] border-[#0d2111] relative z-10 w-full shrink-0">
                <Ticket className="text-[#1A535C]" size={28} />
                <h2 className="text-2xl font-black text-[#0d2111] tracking-widest flex-1">당첨자 명단</h2>
                <span className="bg-[#FFE66D] text-[#0d2111] py-1 px-3 border-[2px] border-[#0d2111] rounded-xl text-sm font-black shadow-[2px_2px_0_0_#0d2111] whitespace-nowrap transform rotate-3">
                  총 {winners.length}명
                </span>
              </div>
              
              <div className="flex-1 overflow-y-auto pr-3 space-y-4 custom-scrollbar relative z-10 w-full pb-4">
                <AnimatePresence>
                  {winners.length === 0 ? (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="text-[#1A535C] text-center pt-20 font-bold flex flex-col items-center gap-5 h-full opacity-70"
                    >
                      <div className="w-20 h-20 border-[3px] border-[#0d2111] border-dashed rounded-full flex items-center justify-center bg-white shadow-[4px_4px_0_0_rgba(13,33,17,0.2)] transform -rotate-6">
                        <Ticket size={32} className="text-[#0d2111]" />
                      </div>
                      <span className="tracking-wide text-base leading-relaxed">아직 뽑힌 사람이<br/>없습니다!</span>
                    </motion.div>
                  ) : (
                    winners.map((winner, idx) => (
                      <motion.div
                        key={`${winner}-${winners.length - idx}`}
                        initial={{ opacity: 0, x: -20, y: 10 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ type: "spring", bounce: 0.3 }}
                        className="bg-white border-[3px] border-[#0d2111] rounded-2xl p-4 shadow-[4px_4px_0_0_#0d2111] flex justify-between items-center group hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#FF6B6B] hover:border-[#FF6B6B] transition-all duration-200"
                      >
                        <div className="flex flex-col">
                          <span className="text-[12px] text-[#1A535C] font-black mb-0.5 tracking-[0.2em] uppercase">
                            Winner {winners.length - idx}
                          </span>
                          <span className="text-3xl font-black text-[#0d2111] font-sans">
                            No. <span className="text-[#FF6B6B]">{winner}</span>
                          </span>
                        </div>
                        <div className="w-12 h-12 bg-[#FFE66D] border-[2px] border-[#0d2111] rounded-full flex justify-center items-center shadow-[2px_2px_0_0_#0d2111] group-hover:bg-[#4ECDC4] transition-colors">
                          <Sparkles size={20} className="text-[#0d2111]" />
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

