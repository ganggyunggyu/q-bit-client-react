import { Heart } from 'lucide-react';
import { Cert } from '@/entities';
import React from 'react';

interface CertCardProps {
  cert: Cert;
  dDay: number;
  isLiked?: boolean;
}

export const CertCard: React.FC<CertCardProps> = ({ cert, dDay, isLiked }) => {
  const [isLike, setIsLike] = React.useState(isLiked);

  const toggleLike = () => {
    setIsLike(!isLike);
  };
  return (
    <div className="flex justify-between items-start p-4 rounded-2xl bg-white shadow-sm border border-divide">
      <div className="flex flex-col space-y-1">
        <h3 className="text-black font-headline-sb">{cert.jmfldnm}</h3>
        <span className="text-black-alternative/80 font-caption-m">
          {cert.agency}
        </span>
        <div className="mt-2 inline-flex items-center">
          <span
            className={`px-3 py-1 rounded-full
            ${cert.qualgbnm === '국가기술자격' && 'bg-green/10 text-green'}
            ${cert.qualgbnm === '국가전문자격' && 'bg-blue-good/10 text-blue-good'}
            `}
          >
            {cert.qualgbnm}증
          </span>
        </div>
      </div>

      <div className="flex flex-col items-end space-y-1">
        <button
          className="w-8 h-8 rounded-full border border-divide flex items-center justify-center"
          aria-label="찜하기"
          onClick={toggleLike}
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isLike ? 'fill-urgent text-urgent' : 'fill-divide text-divide'
            }`}
          />
        </button>
        <div className=" text-blue-good font-semibold">D-{dDay}</div>
        <div className=" text-black-alternative/80 font-caption-m">
          접수까지
        </div>
      </div>
    </div>
  );
};
