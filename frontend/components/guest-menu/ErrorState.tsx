interface ErrorStateProps {
  error: string;
  onRetry?: () => void;
}

export const ErrorState = ({ error, onRetry }: ErrorStateProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-premium-beige">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
          <svg
            className="w-10 h-10 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-premium-black">Oops!</h2>
          <p className="text-premium-gray">{error}</p>
        </div>

        {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-3 bg-gold-500 text-white font-semibold rounded-2xl shadow-lg hover:bg-gold-600 active:scale-95 transition-all"
          >
            Quét lại QR
          </button>
        )}
      </div>
    </div>
  );
};
