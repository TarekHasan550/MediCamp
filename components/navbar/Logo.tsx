import React from 'react'
import { GiHealthNormal } from 'react-icons/gi';

export default function Logo() {
  return (
    <div>
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-lg">
            <GiHealthNormal />
          </span>
        </div>
        <span className="text-xl font-semibold text-secondary-foreground">
          MediCamp
        </span>
      </div>
    </div>
  );
}
