import Image from 'next/image';

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  style?: React.CSSProperties;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
};

export default function SmartImage({ src, alt, width, height, style, priority, loading }: Props) {
  const isLocal = src.startsWith('/');
  if (isLocal) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={style}
        priority={priority}
        loading={loading}
      />
    );
  }

  // Remote images: avoid Next remote domain config headaches by using <img>.
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading ?? 'lazy'}
      decoding="async"
      style={style}
      referrerPolicy="no-referrer"
    />
  );
}


