import type { ThemeType } from '../../types/theme'; 
import { Flower } from "../../assets/Flower"; 
import { Leaf } from "../../assets/Leaf";
import { Star } from "../../assets/Star";

interface StickerProps {
  theme: ThemeType;
  className?: string;
}

const Sticker = ({ theme, className }: StickerProps) => {
  const renderSvg = () => {
    switch (theme) {
      case 'morning': return <Flower />; 
      case 'afternoon': return <Leaf />;
      case 'night': return <Star />;
      default: return null;
    }
  };

  return <div className={`sticker-container ${className}`}>{renderSvg()}</div>;
};

export default Sticker;