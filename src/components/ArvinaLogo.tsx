import React from 'react';

interface ArvinaLogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'light' | 'symbol';
  size?: 'sm' | 'md' | 'lg';
}

export const ArvinaLogo: React.FC<ArvinaLogoProps> = ({
  className = '',
  variant = 'compact',
  size = 'md',
}) => {
  const isLight = variant === 'light';
  const taupeColor = isLight ? '#FAF6F0' : '#7D6D5A';
  const textColor = isLight ? '#FFFFFF' : '#1A1816';
  const brushColor = isLight ? 'rgba(255, 255, 255, 0.08)' : '#ECE2D4';
  const heartColor = '#E879A8';

  // Dimension scaling
  const scale = size === 'sm' ? 0.8 : size === 'lg' ? 1.25 : 1;

  if (variant === 'symbol') {
    return (
      <svg
        viewBox="0 0 100 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block ${className}`}
        style={{ width: 36 * scale, height: 46 * scale }}
        aria-label="Arvina Emblem"
      >
        {/* Hat Lady Silhouette */}
        <path
          d="M20 38C22 28 35 24 50 24C65 24 78 28 80 38C75 35 62 33 50 33C38 33 25 35 20 38Z"
          fill={taupeColor}
        />
        <path
          d="M38 27C38 18 43 14 50 14C57 14 62 18 62 27C58 25 54 24 50 24C46 24 42 25 38 27Z"
          fill={taupeColor}
        />
        {/* Face/Head Silhouette */}
        <circle cx="50" cy="45" r="9" fill={taupeColor} fillOpacity="0.9" />
        {/* Bodice / Corset */}
        <path
          d="M38 60C38 60 44 57 50 59C56 57 62 60 62 60C60 72 55 76 50 78C45 76 40 72 38 60Z"
          fill={taupeColor}
        />
        {/* Painterly flowing skirt layers */}
        <path
          d="M44 80L56 80L66 87L34 87Z"
          fill={taupeColor}
        />
        <path
          d="M30 89L70 89L76 96L24 96Z"
          fill={taupeColor}
        />
        <path
          d="M20 98L80 98L85 106L15 106Z"
          fill={taupeColor}
        />
        <path
          d="M26 108L74 108L68 114L32 114Z"
          fill={taupeColor}
        />
        {/* Graceful legs */}
        <path
          d="M48 114L47 130L50 130L51 114Z"
          fill={taupeColor}
        />
        <path
          d="M52 114L55 127L53 127L51 114Z"
          fill={taupeColor}
        />
      </svg>
    );
  }

  if (variant === 'full') {
    return (
      <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
        <svg
          viewBox="0 0 340 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full max-w-[280px] sm:max-w-[340px] h-auto"
          aria-label="Arvina - built for bold souls"
        >
          {/* Organic brush stroke background */}
          <path
            d="M50 78C75 55 125 45 190 52C250 58 310 65 330 85C315 100 270 120 200 115C135 110 70 125 40 102C45 92 48 85 50 78Z"
            fill={brushColor}
          />
          <path
            d="M30 95C60 75 110 80 160 88C220 96 280 90 320 105C290 125 210 130 150 120C100 112 50 120 30 95Z"
            fill={brushColor}
            opacity="0.8"
          />

          {/* Lady Illustration */}
          <g transform="translate(45, 15) scale(0.85)">
            {/* Hat */}
            <path
              d="M10 42C12 28 28 20 50 20C72 20 88 28 90 42C80 37 65 35 50 35C35 35 20 37 10 42Z"
              fill={taupeColor}
            />
            <path
              d="M35 25C35 14 42 10 50 10C58 10 65 14 65 25C60 22 55 21 50 21C45 21 40 22 35 25Z"
              fill={taupeColor}
            />
            {/* Head Silhouette */}
            <circle cx="50" cy="46" r="10" fill={taupeColor} />
            {/* Bodice */}
            <path
              d="M34 62C34 62 42 58 50 61C58 58 66 62 66 62C64 76 58 81 50 83C42 81 36 76 34 62Z"
              fill={taupeColor}
            />
            {/* Flowing tiered skirt */}
            <path d="M42 85H58L68 93H32L42 85Z" fill={taupeColor} />
            <path d="M26 95H74L80 104H20L26 95Z" fill={taupeColor} />
            <path d="M14 106H86L92 116H8L14 106Z" fill={taupeColor} />
            <path d="M22 118H78L70 125H30L22 118Z" fill={taupeColor} />
            {/* Graceful legs */}
            <path d="M47 125L46 148L50 148L51 125Z" fill={taupeColor} />
            <path d="M52 125L57 144L54 144L51 125Z" fill={taupeColor} />
          </g>

          {/* Brand Wordmark: ARVINA */}
          <text
            x="135"
            y="96"
            fontFamily="'Playfair Display', Georgia, serif"
            fontSize="44"
            fontWeight="700"
            letterSpacing="0.08em"
            fill={textColor}
          >
            ARVINA
          </text>

          {/* Shopping Bag with Heart */}
          <g transform="translate(294, 88) scale(0.9)">
            <rect
              x="2"
              y="6"
              width="20"
              height="22"
              rx="2"
              stroke={taupeColor}
              strokeWidth="1.5"
              fill="none"
            />
            {/* Bag Handle */}
            <path
              d="M7 6V3C7 1.89543 7.89543 1 9 1H15C16.1046 1 17 1.89543 17 3V6"
              stroke={taupeColor}
              strokeWidth="1.5"
              fill="none"
            />
            {/* Pink Heart */}
            <path
              d="M12 14.5C12 14.5 9 12 9 10C9 8.89543 9.89543 8 11 8C11.5 8 11.8 8.2 12 8.5C12.2 8.2 12.5 8 13 8C14.1046 8 15 8.89543 15 10C15 12 12 14.5 12 14.5Z"
              fill={heartColor}
            />
          </g>

          {/* Tagline: built for bold souls. */}
          <text
            x="145"
            y="126"
            fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
            fontSize="14.5"
            fontWeight="500"
            letterSpacing="0.12em"
            fill={taupeColor}
          >
            built for bold souls.
          </text>
        </svg>
      </div>
    );
  }

  // Compact Header / Standard lockup
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Icon Silhouette */}
      <svg
        viewBox="0 0 70 85"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-8 sm:w-7 sm:h-9 shrink-0"
        aria-hidden="true"
      >
        <path
          d="M10 24C12 16 22 12 35 12C48 12 58 16 60 24C54 21 45 19 35 19C25 19 16 21 10 24Z"
          fill={taupeColor}
        />
        <circle cx="35" cy="29" r="6" fill={taupeColor} />
        <path
          d="M25 40C25 40 30 37 35 39C40 37 45 40 45 40C43 49 39 52 35 54C31 52 27 49 25 40Z"
          fill={taupeColor}
        />
        <path d="M22 56L48 56L52 64L18 64Z" fill={taupeColor} />
        <path d="M14 66L56 66L60 74L10 74Z" fill={taupeColor} />
        <path d="M33 74L32 85L35 85L36 74Z" fill={taupeColor} />
      </svg>

      {/* Brand Lockup */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span
            className="font-serif text-xl sm:text-2xl font-bold tracking-[0.14em] uppercase transition-colors"
            style={{ color: textColor }}
          >
            ARVINA
          </span>
          {/* Subtle Pink Heart Shopping Bag Badge */}
          <div className="relative inline-flex items-center justify-center">
            <svg
              width="14"
              height="15"
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0 opacity-90"
            >
              <rect
                x="1.5"
                y="4.5"
                width="11"
                height="9.5"
                rx="1.5"
                stroke={taupeColor}
                strokeWidth="1.2"
                fill="none"
              />
              <path
                d="M4.5 4.5V2.5C4.5 1.67157 5.17157 1 6 1H8C8.82843 1 9.5 1.67157 9.5 2.5V4.5"
                stroke={taupeColor}
                strokeWidth="1.2"
              />
              <path
                d="M7 10.5C7 10.5 4.8 8.8 4.8 7.3C4.8 6.5 5.4 6 6.1 6C6.5 6 6.8 6.2 7 6.4C7.2 6.2 7.5 6 7.9 6C8.6 6 9.2 6.5 9.2 7.3C9.2 8.8 7 10.5 7 10.5Z"
                fill={heartColor}
              />
            </svg>
          </div>
        </div>
        <span
          className="text-[9px] sm:text-[10px] tracking-[0.22em] font-medium uppercase -mt-0.5"
          style={{ color: taupeColor }}
        >
          built for bold souls
        </span>
      </div>
    </div>
  );
};
