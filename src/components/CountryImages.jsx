import { useState, useEffect } from "react";
import axios from "axios";

const CountryImages = ({ country }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const cx = process.env.REACT_APP_CX_ID;

  useEffect(() => {
    if (country) {
      const fetchImages = async () => {
        setLoading(true);
        try {
          const url = `https://www.googleapis.com/customsearch/v1?q=${country} panorama&cx=${cx}&key=${googleApiKey}&searchType=image&num=3`;
          const response = await axios.get(url);
          setImages(response.data.items);
        } catch (err) {
          setError("Erreur lors du chargement des images");
        } finally {
          setLoading(false);
        }
      };

      fetchImages();
    }
  }, [country]);

  if (loading) return <p>Chargement des images...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Images du pays {country}</h2>
      {images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div key={index} className="image-container">
              <img
                src={image.link}
                alt={image.title}
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>
      ) : (
        <p>Aucune image trouvée.</p>
      )}
    </div>
  );
};

export default CountryImages;
