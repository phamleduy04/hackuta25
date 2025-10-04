import React from "react";
import "./GlassCard.css";

interface GlassCardProps {
  title?: string;
  imageSrc?: string;
  imageAlt?: string;
  children?: React.ReactNode;
}

const GlassCard: React.FC<GlassCardProps> = ({
  title,
  imageSrc,
  imageAlt,
  children,
}) => {
  return (
    <div className="glass-card">
      {imageSrc && (
        <img
          src={imageSrc}
          alt={imageAlt || title || "Glass card image"}
          className="glass-card-image"
        />
      )}
      {title && <h2 className="glass-card-title">{title}</h2>}
      <div className="glass-card-content">{children}</div>
    </div>
  );
};

export default GlassCard;
