// Internal
import { Text, Block, Heading } from '../components'

const NotFound = () => {
    return (
        <Block className="w-full">
            <Heading title="404 - Siden blev ikke fundet!" />
            <Text variant='p'>Gå til overblik-siden via logoet. Eller naviger via browser-pilene.</Text>
        </Block>
    )
}

export default NotFound