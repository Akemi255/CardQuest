import { Sparkles, CircleDollarSign as Dollar } from "lucide-react";

export const IconButtons = {
  sparkle: (props) => <Sparkles className="w-4 h-4 text-blue-400" {...props} />,
  dollar: (props) => <Dollar className="w-4 h-4" {...props} />,
};
