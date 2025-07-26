import React from 'react';
import { Switcher } from '@/components/ui';

const DemoModeToggle = ({ isDemoMode, onToggle }) => {
    return (
        <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">
                Demo Mode
            </span>
            <Switcher
                checked={isDemoMode}
                onChange={onToggle}
                color="[#00C3DE]"
                checkedContent="ON"
                unCheckedContent="OFF"
            />
        </div>
    );
};

export default DemoModeToggle;