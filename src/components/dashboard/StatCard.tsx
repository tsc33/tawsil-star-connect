
import React from "react";
import { cn } from "@/lib/utils";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    positive: boolean;
  };
  className?: string;
};

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, className }) => {
  return (
    <div className={cn("bg-white rounded-lg shadow-sm p-5 border border-gray-100 card-hover", className)}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold mt-1 text-gray-900">{value}</h3>
          {trend && (
            <div className="flex items-center mt-2">
              <span className={`text-xs font-medium ${trend.positive ? "text-green-600" : "text-red-600"}`}>
                {trend.positive ? "+" : "-"}{trend.value}%
              </span>
              <span className="text-xs text-gray-500 ml-1">depuis hier</span>
            </div>
          )}
        </div>
        <div className="p-2 rounded-lg bg-tawsil-blue/10 text-tawsil-blue">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
