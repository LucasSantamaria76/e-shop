import { icons } from 'lucide-react'

const Icon = ({ name, strokeWidth = 0.5, ...props }) => {
	const LucideIcon = icons[name]

	return <LucideIcon {...props} strokeWidth={strokeWidth} />
}

export default Icon
