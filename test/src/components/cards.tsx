interface CardsProps {
    title: string;
    description: string;
    price: number;
    thumbnail: string;
  }
  
  const Cards = ({ title, description, price, thumbnail }: CardsProps): JSX.Element => {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-48 object-cover rounded-t-lg mb-4"
        />
  
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
  
        <p className="text-gray-600 text-sm mb-4">{description}</p>
  
        <p className="text-blue-500 text-xl font-bold">${price}</p>
      </div>
    );
  };
  
  export default Cards;
  