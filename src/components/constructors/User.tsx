import React, { Fragment, useState } from "react";
import { urlBrand } from "./user/User.types";

interface PortraitProps {
  photo?: urlBrand | undefined;
  style?: React.CSSProperties;
}

export namespace USER {
  export namespace PHOTO {
    export const Portrait = ({ photo, style }: PortraitProps): JSX.Element => {
      const [imageError, setImageError] = useState<boolean>(false);
      const [imageDefault, setImageDefault] = useState<boolean>(true);
      let defaultLink =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACWUlEQVR4nO2ZP08VQRDAfz7ztOAJhQlWWII2IhbS2dEg+CCBDwFaUom0EP0CWosQQPwCkkCDjR9A+ScFNmDyCtHGZ+SZifOSyQY57ti7Pcj9kkkuuZ3Z2dvZmd09KCgo8EkZGAXmgQ3gp4o8z+k7aZNLhoFtoBEh0maIHFECnp/CcVdmVDc4rvP7wFOgG2hRuQtM6jt3EMHDxjq0AFROaH8NWHR0qgTiihPz4vylU+hJmyWjtxVqYY86YXPSlz9uJg6M/ggBmDcOSMzH5ZnRf0MANo0DdxLoy8Ju6kudyJwfxoE44dNEdJr6YuvcDaDV6H8nAOc+hOaMA1Kk4jJl9GfJQRqV1BgnfL6FTqNlp5Atxihkb/NQyNBdpd0WLEXMRKvj/BHwiMDMOIM40CLVo9mpos9TTtiITJMDSscMIkqO1PkSOaKq8Rzl/FYewuZ/lDWjyN7msxY7kU+aKkfyfKQsKLjIdADLwGGC24e4cqjFrsOn87UMHG84UvM1iOUAzjdUZCbOjA2b+6RPr++Djv0iWdHw2ecfYyyLKlr2PQC7g+wkfbp8D2DFGBsnfZ6Y/l75MDhmDO4BbaRHG/DV9Nfnw2iLY3Q94TVKFBXgg+nnI3DZl/F+ZzHvAA98GeefrR1jvw7cwzOP9SRlT1XvgYcJs5PoDOgas3Z/p3lLUXVulW3BeQdM6GxJJrmuV/BX9blL301oW9Fx7UjGGyRl2vV0Vfe4ZagDr4EbZMhN4AWwewbHd/UXlbedZ1Jua/5+CawBX3Q3+Uulpot0VdvIeroV2umCAi4AfwF1jXX6i4PPbQAAAABJRU5ErkJggg==";

      const handleImageError = (): void => {
        setImageDefault(false);
        setImageError(true);
      };

      const handleImageSuccess = (): void => {
        setImageDefault(false);
      };

      return (
        <Fragment>
          {imageDefault ? <img src={defaultLink} style={style} /> : ""}
          {imageError ? (
            <img src={defaultLink} style={style} />
          ) : (
            <img src={photo} onError={handleImageError} onLoad={handleImageSuccess} hidden={imageDefault} style={style} />
          )}
        </Fragment>
      );
    };

    export const MiniPhoto = ({ photo }: { photo?: urlBrand | undefined }): JSX.Element => {
      return (
        <div className="rounded-full bg-slate-400 h-14 w-14">
          <Portrait photo={photo} style={{ borderRadius: "50%", width: "100%" }} />
        </div>
      );
    };
  }
}
