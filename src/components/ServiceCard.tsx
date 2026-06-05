import type { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  image: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const ServiceCard = ({ image, icon: Icon, title, description }: ServiceCardProps) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-card border-t-4 border-teal hover:border-amber transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Icon overlay */}
        <div className="absolute top-4 left-4 w-10 h-10 bg-amber rounded-full flex items-center justify-center shadow-lg">
          <Icon size={20} className="text-charcoal" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display font-semibold text-xl text-charcoal mb-3">
          {title}
        </h3>
        <p className="font-body text-sm text-charcoal-light leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;
