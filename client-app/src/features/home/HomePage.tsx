import { Link } from "react-router-dom"
import { Button, Container, Header, Segment,Image } from "semantic-ui-react"


export default function HomePafe() {
    return (
<Segment inverted textAlign='center' vertical className='masthead'>
    <Container text>
        <Header as='h1' inverted>
            <Image size='massive' src='/assets/1.jpeg' alt='logo' style={{marginBottom:12}}/>
       Aktivtietet
      </Header>
      <Header as='h2' inverted content = 'Eja Shiko Aktivitetet' />
      <Button as={Link} to='/activities' size='huge' inverted>
         Shiko Aktivitet
      </Button>
      <Button as={Link} to='/activities' size='huge' inverted>
         Festivalet
         </Button>
         <Button as={Link} to='/activities' size='huge' inverted>
         Blej Bileten
         </Button>
         <Button as={Link} to='/activities' size='huge' inverted>
        Kengetari
         </Button>
       </Container>
</Segment>
    )
}