export type HeaderProps= {
    title: string
    subtitle?: string
    user: {
      name: string
      avatarUrl?: string
    }
  }

  export type MobileHeaderProps = {
    onMobileMenuClick: () => void
    title?: string
    subtitle?: string
    onAddClick?: () => void
    button?: boolean
  }