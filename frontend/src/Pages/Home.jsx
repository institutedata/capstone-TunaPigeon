
import Grid from '@mui/material/Grid';

//uses grid for homepage and styles for each div

const HomePage = () => {
  return (
    <>

      <Grid container spacing={2} >
        <Grid item xs={12}>
          <div style={{ height: '100px', backgroundColor: 'transparent', display: 'inline' }}>
            <h1>Home</h1>
          </div>
        </Grid>
        <Grid item xs={12} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', border: '1px solid black', borderBottom: '1px solid transparent', paddingTop: '50px', paddingRight: '50px', paddingLeft: '50px', paddingBottom: '0' }}>
          <div style={{ height: '100px', backgroundColor: 'transparent', display: 'inline' }}>

            The story is set in a world where certain people, known as "benders," have the ability to manipulate one of the four classical elements: water, earth, fire, or air. The Avatar is the only person capable of bending all four elements and is tasked with maintaining balance in the world.

          </div>
        </Grid>
        <Grid item xs={12} md={6} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderLeft: '1px solid black', padding: '50px' }}>
          <div style={{ height: '500px', backgroundColor: 'transparent', display: 'inline' }}>
            <img src="https://m.media-amazon.com/images/I/51p0QKI6bRL._AC_UF894,1000_QL80_.jpg" alt="Description of the image" height="300px" />

            <p> <strong>"Avatar: The Last Airbender"</strong> follows the journey of Aang, the current Avatar who disappeared for a hundred years after being frozen in an iceberg. Aang, along with his friends Katara, a waterbender, and Sokka, a non-bender, embarks on a quest to master all four elements and defeat the tyrannical Fire Nation ruler, Fire Lord Ozai, who seeks to conquer the world. Along the way, Aang learns about friendship, responsibility, and the importance of balance.

            </p>
          </div>
        </Grid>
        <Grid item xs={12} md={6} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRight: '1px solid black', padding: '50px' }}>
          <div style={{ height: '500px', backgroundColor: 'transparent', display: 'inline' }}>
            <img src="https://m.media-amazon.com/images/I/71RdBbHY6vL._AC_UF894,1000_QL80_.jpg" alt="Description of the image" height="300px" />

            <p><strong>"The Legend of Korra"</strong> takes place 70 years after the events of "Avatar: The Last Airbender" and follows the next Avatar, Korra, a headstrong and talented waterbender from the Southern Water Tribe. Korra faces new challenges as she strives to master airbending and maintain balance in a rapidly changing world. Throughout her journey, Korra confronts various threats, including political unrest, anti-bender movements, and dark spirits. Alongside her friends, including the brothers Mako and Bolin, and the non-bender Asami, Korra learns valuable lessons about leadership, identity, and spirituality.
            </p>
          </div>
        </Grid>
        <Grid item xs={12} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', border: '1px solid black', borderTop: '1px solid transparent', paddingTop: '0', paddingRight: '50px', paddingLeft: '50px', paddingBottom: '50px' }}>
          <div style={{ height: '100px', backgroundColor: 'transparent', display: 'inline' }}>
            Both series explore themes of friendship, identity, and the struggle between good and evil, while also delving into complex socio-political issues and the interconnectedness of all living things. Together, they form an epic saga of adventure, growth, and the enduring power of hope.
          </div>
        </Grid>


      </Grid>
    </>
  );
};

export default HomePage;
