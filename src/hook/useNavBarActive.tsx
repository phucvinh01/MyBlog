import { usePathname} from 'next/navigation'

const useNavbarActive = (route: string) => {

    const pathname = usePathname();

   const isActive = (pathname.includes(route) && route.length > 1 ) || pathname === route

  return (
    isActive
  )
}

export default useNavbarActive