import { Heart } from 'lucide-react';
import { Cert } from '@/entities';
import React from 'react';
import { useRouter } from '@/shared';

interface CertCardProps {
  cert: Cert;
  dDay: number;
  isLiked?: boolean;
}

export const CertCard: React.FC<CertCardProps> = ({ cert, dDay, isLiked }) => {
  const [isLike, setIsLike] = React.useState(isLiked);

  const { navigate } = useRouter();

  const toggleLike = (e) => {
    e.stopPropagation();

    setIsLike(!isLike);
  };

  const handleCertClick = () => {
    navigate(`/search/${cert._id}`);
  };
  return (
    <div
      onClick={handleCertClick}
      className="max-h-[122px] flex justify-between items-start p-4 rounded-2xl bg-white shadow-sm border border-divide"
    >
      <div className="flex flex-col">
        <p className="text-black font-headline-sb mb-1">{cert.jmfldnm}</p>
        <span className="text-black-alternative/80 font-caption-m mb-5">
          {cert.agency}
        </span>
        <div className="inline-flex items-center">
          <span
            className={`rounded-full py-1 px-3 font-caption-m
            ${cert.qualgbnm === '국가기술자격' && 'bg-green/10 text-green'}
            ${cert.qualgbnm === '국가전문자격' && 'bg-blue-good/10 text-blue-good'}
            `}
          >
            {cert.qualgbnm}증
          </span>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <button
          className="w-8 h-8 rounded-full border border-divide flex items-center justify-center mb-2"
          aria-label="찜하기"
          onClick={(e) => toggleLike(e)}
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isLike ? 'fill-primary text-primary' : 'fill-divide text-divide'
            }`}
          />
        </button>
        <div className=" text-blue-good font-title-sb mb-1">D-{dDay}</div>
        <div className=" text-black-alternative/80 font-caption-m">
          접수까지
        </div>
      </div>
    </div>
  );
};
