import { Arrow } from '@/assets/icons/arrow';
import { FC, Fragment } from 'react';

export type BreadCrumbsProps = {
  dataUrl: BreadCumbs[];
};

const BreadCrumbs: FC<BreadCrumbsProps> = ({ dataUrl }) => {
  return (
    <div className=" bg-white py-2">
      <ul className="flex items-center">
        {dataUrl.map((data: BreadCumbs) => {
          return (
            <Fragment key={data.id}>
              <li className="flex items-center">
                {data.url ? (
                  <>
                    <a
                      href={data.url}
                      className="font-semibold text-base text-black hover:text-primary"
                    >
                      {data.text}
                    </a>
                    <span className="px-3">
                      <Arrow />
                    </span>
                  </>
                ) : (
                  <p className="truncate text-ellipsis">{data.text}</p>
                )}
              </li>
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default BreadCrumbs;
