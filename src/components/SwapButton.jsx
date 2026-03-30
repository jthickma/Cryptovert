export default function SwapButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="group flex items-center justify-center w-12 h-12 rounded-full
                 bg-gradient-to-br from-gradient-start to-gradient-end
                 shadow-lg shadow-gradient-start/25
                 hover:shadow-xl hover:shadow-gradient-start/40
                 hover:scale-110 active:scale-95
                 transition-all duration-200 cursor-pointer mx-auto"
      title="Swap currencies"
    >
      <svg
        className="w-5 h-5 text-white transition-transform duration-300 group-hover:rotate-180"
        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
      </svg>
    </button>
  );
}
