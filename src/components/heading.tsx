// Internal
import { Text } from './'

/**
 * Renders a form field.
 *
 * @param {string} props.title Text for heading.
 */

export const Heading = ({
    title
} : {
    title: string
}) => {
	return (
        <Text variant="h1">{title}</Text>
    )
}