import { useState, useEffect } from "react";
import axios from "axios";

const CountryImages = ({ country }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [coordinates, setCoordinates] = useState(null);

  const googleApiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const cx = import.meta.env.VITE_CX_ID;
  const pexelsApiKey = import.meta.env.VITE_PEXELS_API_KEY;
  const opencageApiKey = import.meta.env.VITE_OPENCAGE_API_KEY;

  useEffect(() => {
    if (country) {
      // Récupérer les images du pays
      const fetchImages = async () => {
        setLoading(true);
        setImages([]);
        setError(null);

        try {
          const query = `"${country}" ("beautiful landscape" OR "natural scenery" OR "breathtaking view")`;
          const randomStart = Math.random() > 0.5 ? 1 : 6; // Soit résultats 1-10, soit 6-15
          const googleUrl = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&cx=${cx}&key=${googleApiKey}&searchType=image&num=10&imgSize=large&imgType=photo&start=${randomStart}`;

          // Essayer d'abord avec Google API
          const googleResponse = await axios.get(googleUrl);
          let imageResults = googleResponse.data.items || [];

          if (imageResults.length === 0) {
            throw new Error("Aucune image trouvée avec Google.");
          }

          // Enlever les images en double
          const uniqueImages = Array.from(
            new Set(imageResults.map((img) => img.link))
          ).map((link) => imageResults.find((img) => img.link === link));

          // Mélanger et prendre x images aléatoires
          const selectedImages = uniqueImages
            .sort(() => Math.random() - 0.5)
            .slice(0, 8);
          setImages(selectedImages);
        } catch (err) {
          console.log("Google API échouée, tentative avec Pexels...");

          const pexelsUrl = `https://api.pexels.com/v1/search?query=${encodeURIComponent(country)}&per_page=8&page=1`;

          try {
            const pexelsResponse = await axios.get(pexelsUrl, {
              headers: {
                Authorization: pexelsApiKey
              }
            });

            const pexelsImages = pexelsResponse.data.photos || [];
            if (pexelsImages.length === 0) {
              setError("Aucune image trouvée.");
              return;
            }

            setImages(pexelsImages);
          } catch (pexelsError) {
            setError("Erreur lors de la récupération des images avec Pexels.");
          }
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
      <h2 className="bg-black mb-8">Images of {country}</h2>
      {images.length > 0 ? (
        <div className="flex justify-center gap-5 flex-wrap">
          {images.map((image, index) => (
            <img
              key={index}
              src={image.src ? image.src.large : image.link} // Vérifie la source d'image selon l'API
              alt={`Image ${index}`}
              className="w-[800px] h-[600px] object-cover rounded-lg shadow-lg"
            />
          ))}
        </div>
      ) : (
        <div>No images found.</div>
      )}
    </div>
  );
};

export default CountryImages;
