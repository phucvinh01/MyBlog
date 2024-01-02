import clsx from 'clsx';
import Link from 'next/link';

type RouterProps = {
  route: string;
  label: string;
  onClick?: () => void;
  isActive?: boolean;
};

const Route = ({ route, label, onClick, isActive }: RouterProps) => {
  return (
    <Link
      prefetch={false}
      onClick={onClick}
      className={clsx(isActive && 'text-primary  dark:text-light' ,!isActive && 'text-secondary bg-transparent rounded-none dark:text-light')}
      href={route}>
      {label}
    </Link>
  );
};

export default Route;
