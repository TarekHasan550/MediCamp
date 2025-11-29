import Link from 'next/link';
import { GiHealthNormal } from 'react-icons/gi';

export default function Logo({ color = 'black' }: { color?: string }) {
  return (
    <Link href="/">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary rounded-xs flex items-center justify-center">
          <span
            className={`${
              color == 'black'
                ? 'text-primary-foreground'
                : 'text-secondary-foreground'
            } font-bold text-lg`}
          >
            <GiHealthNormal />
          </span>
        </div>
        <span
          className={`${
            color == 'black'
              ? 'text-seconday-foreground'
              : 'text-primary-foreground'
          } text-xl font-semibold`}
        >
          MediCamp
        </span>
      </div>
    </Link>
  );
}
