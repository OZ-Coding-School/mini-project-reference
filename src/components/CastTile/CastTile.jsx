import "./CastTile.scss";

export default function CastTile(props) {
  return (
    <div className="cast-tile">
      <img
        src={
          props.person.profile_path
            ? `https://image.tmdb.org/t/p/w200/${props.person.profile_path}`
            : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        }
        alt={`Profile of ${props.person.original_name}`}
      />
      <div className="info">
        <p className="name">{props.person.original_name}</p>
        <p className="character">{props.person.character}</p>
      </div>
    </div>
  );
}
