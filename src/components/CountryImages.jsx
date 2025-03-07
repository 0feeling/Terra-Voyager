import { useState, useEffect } from "react";
import axios from "axios";

const CountryImages = ({ country }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const googleApiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const cx = import.meta.env.VITE_CX_ID;

  useEffect(() => {
    if (country) {
      const fetchImages = async () => {
        setLoading(true);
        setImages([]); // Réinitialiser les images avant de commencer une nouvelle recherche
        try {
          const query = `"${country}" ("beautiful landscape" OR "natural scenery" OR "breathtaking view") -site:shutterstock.com -site:istockphoto.com -site:adobestock.com -site:gettyimages.com -site:bigstockphoto.com -site:depositphotos.com -site:123rf.com -site:dreamstime.com -site:alamy.com -site:fotolia.com -site:etsystatic.com -site:royalcaribbean.com -site:envato.com -site:pinterest.com -site:flickr.com -site:canva.com -site:redbubble.com -site:deviantart.com -site:freepik.com -inurl:santorini.jpg -watermark -AI -generated -artificial -DALL·E -MidJourney -stock -small -lowres -generic -excessivebranding -meme -quote -text -typography -infographic -poster -CGI -render -prompt -fantasy -conceptart`;

          const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&cx=${cx}&key=${googleApiKey}&searchType=image&num=3&imgSize=large&imgType=photo`;
          const response = await axios.get(url);
          console.log(response.data);
          setImages(response.data.items);
        } catch (err) {
          setError("Nombre de requêtes dépassé");
        } finally {
          setLoading(false);
        }
      };

      fetchImages();
    }
  }, [country]);

  if (loading) return <div>Loading images...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="text-white">
      <h2>Images of the country {country}</h2>
      {images.length > 0 ? (
        <div className="flex justify-center gap-5 flex-wrap">
          {images.map((image, index) => (
            <img
              key={index}
              src={image.link}
              alt={`Image ${index}`}
              className="w-[800px] h-[600px] object-cover rounded-lg shadow-lg"
            />
          ))}
        </div>
      ) : (
        <div>Aucune image trouvée.</div>
      )}

      {country && (
        <div className="m-8 flex flex-col items-center">
          <h2>More about {country}</h2>
          <div className="flex justify-center">
            <iframe
              src={`https://en.wikipedia.org/wiki/${encodeURIComponent(country)}`}
              className="w-[800px] h-[600px] border rounded-lg shadow-lg"
              title={`Page Wikipedia de ${country}`}
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryImages;
