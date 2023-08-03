export function GoodsItem(props) {
  const { id, title, description, price, image, addToBasket } = props;



  return (
    <div className="card medium">
      <div className="card-image img-hight">
        <img src={image} alt={title} />
        <span className="card-title">{title}</span>
      </div>
      <div className="card-content desk">
        <p>{description}</p>
      </div>
      <div className="card-action">
        <button className="btn" onClick={() => addToBasket({
          id,
          title,
          price
        })} >Buy</button>
        <span className="right" style={{fontSize: '1.8rem'}}>{price}grn</span>
      </div>
    </div>
  );
}
