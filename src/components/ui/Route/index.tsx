'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type RouterProps = {
  route: string;
  label: string;
  onClick?: () => void;
  isActive?: boolean;
};
const Route = ({ route, label, onClick }: RouterProps) => {
const pathname = usePathname();

  return (
    <Link
      key={label}
      prefetch={false}
      onClick={onClick}
      className={clsx('text-primary px-3 py-1', {
        'bg-sky-100  rounded-3xl dark:text-black': pathname === route,
      })}
      href={route}>
      {label}
    </Link>
  );
};

export default Route;
