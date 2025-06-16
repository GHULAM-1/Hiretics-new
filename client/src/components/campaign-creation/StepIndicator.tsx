import { CheckCircle, Briefcase } from "lucide-react";

export function StepIndicator({
  step,
  totalSteps = 2,
  activeColor = "#16A34A",
  bgColor = "#BBF7D0",
}: {
  step: number;
  totalSteps?: number;
  activeColor?: string;
  bgColor?: string;
}) {
  // Calculate progress as a percentage
  const progress = ((step - 1) / (totalSteps - 1)) * 100;
  console.log(step, totalSteps, progress);

  return (
    <div className="flex items-center w-full justify-center py-4">
      <div className="relative w-[50%] flex items-center">
        {/* Background line */}
        <div className="absolute inset-0 flex items-center">
          <div
            className="w-full h-1.5 rounded-full"
            style={{ background: bgColor }}
          ></div>
        </div>
        {/* Progress line */}
        <div className="absolute inset-0 flex items-center">
          <div
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              background: activeColor,
              width: `${progress}%`,
            }}
          ></div>
        </div>
        {/* Circles/icons */}
        <div className="relative w-full flex items-center justify-around">
          <div
            className="flex items-center justify-center w-8 h-8 rounded-full"
            style={{
              background: step >= 1 ? activeColor : bgColor,
            }}
          >
            <CheckCircle className="w-4 h-4 text-white" />
          </div>
          <div
            className="flex items-center justify-center w-8 h-8 rounded-full"
            style={{
              background: step >= 2 ? activeColor : bgColor,
            }}
          >
            <Briefcase className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
} 