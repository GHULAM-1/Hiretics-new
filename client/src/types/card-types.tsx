export type CardComponentProps = {
    title?: string
    status?: "completed" | "ongoing"
    username?: string
    userAvatar?: string
    count?: number
    highlight?: boolean
    actions?: React.ReactNode
    footer?: React.ReactNode
    variant?: "default" | "create"
    onClick?: () => void
    className?: string
  }
  