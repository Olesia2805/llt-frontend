import Button from "../Button/Button";

const Tag = ({
  label,
  icon: Icon,
  isActive = false,
  disabled = false,
  onClick,
}) => {
  return (
    <Button
      variant="tag"
      isActive={isActive}
      disabled={disabled}
      onClick={onClick}
      leftIcon={Icon ? <Icon /> : null}
    >
      {label}
    </Button>
  );
};

export default Tag;
