const AvatarLetter = ({ name = 'User', radius, size = 36 }) => {
  let initials = '';
  const setName = name ? name : 'User';
  const names = setName.split(' ');
  if (names.length === 1) {
    initials = names[0].slice(0, 2).toUpperCase();
  } else if (names.length > 1) {
    initials =
      names[0].substring(0, 1).toUpperCase() + names[1].substring(0, 1).toUpperCase();
  }

  const styles = {
    color: 'white',
    width: `${size}px`,
    height: `${size}px`,
    lineHeight: `${size}px`,
    borderRadius: radius ? `${radius}px` : '36px',
    fontSize: `100%`,
  };

  return (
    <div
      className="text-center flex items-center justify-center dark:bg-cyan-600 bg-slate-700"
      style={styles}
      aria-label={name}
    >
      <div className="whitespace-nowrap overflow-hidden text-sm font-semibold">
        {initials}
      </div>
    </div>
  );
};

export default AvatarLetter;
