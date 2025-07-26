import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import ReactSelect from "react-select";
import tw, { theme } from "twin.macro";
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";
import { useConfig } from "../ConfigProvider";
import { useForm } from "../Form/context";
import { useInputGroup } from "../InputGroup/context";
import { HiCheck, HiChevronDown, HiX } from "react-icons/hi";
import Spinner from "../Spinner";
import { CONTROL_SIZES, SIZES } from "../utils/constant";
import useDynamicBorderRadius from "@/utils/hooks/useDynamicBorderRadius";

const DefaultOption = ({
  innerProps,
  label,
  selectProps,
  isSelected,
  isDisabled,
  backgroundColor,
}) => {
  const { themeColor } = selectProps;
  return (
    <div
      className={`select-option ${isSelected && "selected"} ${
        isDisabled && "disabled"
      }`}
      {...innerProps}
    >
      <span className="ml-2">{label}</span>
      {isSelected && (
        <HiCheck className={`text-${themeColor} dark:text-white text-xl`} />
      )}
    </div>
  );
};

const DefaultDropdownIndicator = () => {
  return (
    <div className="select-dropdown-indicator">
      <HiChevronDown />
    </div>
  );
};

const DefaultClearIndicator = (props) => {
  const {
    innerProps: { ref, ...restInnerProps },
  } = props;
  return (
    <div {...restInnerProps} ref={ref}>
      <div className="select-clear-indicator">
        <HiX />
      </div>
    </div>
  );
};

const DefaultLoadingIndicator = ({ selectProps }) => {
  const { themeColor } = selectProps;
  return <Spinner className={`select-loading-indicatior text-${themeColor}`} />;
};

const Select = React.forwardRef((props, ref) => {
  const {
    size,
    style,
    className,
    form,
    field,
    components,
    backgroundColor,
    componentAs: Component,
    ...rest
  } = props;

  const { themeColor, controlSize, primaryColorLevel, mode } = useConfig();
  const formControlSize = useForm()?.size;
  const inputGroupSize = useInputGroup()?.size;

  const selectSize = size || inputGroupSize || formControlSize || controlSize;

  const twColor = theme`colors`;
  const twHeight = theme`height`;

  let isInvalid = false;

  if (!isEmpty(form)) {
    const { touched, errors } = form;

    const touchedField = get(touched, field.name);
    const errorField = get(errors, field.name);

    isInvalid = touchedField && errorField;
  }

  const getBoxShadow = (state) => {
    const shadaowBase = "0 0 0 1px";

    if (isInvalid) {
      return shadaowBase + twColor.red["500"];
    }

    if (state.isFocused) {
      return shadaowBase + twColor[themeColor][primaryColorLevel];
    }

    return "none";
  };

  const { elementRef, borderRadius } = useDynamicBorderRadius();

  const styles = {
    control: (provided, state) => {
      return {
        ...provided,
        height: twHeight[CONTROL_SIZES[selectSize]],
        minHeight: twHeight[CONTROL_SIZES[selectSize]],
        "&:hover": {
          // boxShadow: getBoxShadow(state),
          cursor: "pointer",
        },
        padding: "0 12px",
        boxShadow: "0 20px 25px -5px #0000001a, 0 8px 10px -6px #0000001a",
        borderRadius: borderRadius,
        backgroundColor: backgroundColor ? backgroundColor : "#ffffff",
        ...(isInvalid ? { borderColor: twColor.red["500"] } : {}),
      };
    },
    input: (css) => {
      return {
        ...css,
        input: {
          outline: "none",
          outlineOffset: 0,
          boxShadow: "none !important",
          backgroundColor: backgroundColor ? backgroundColor : "#ffffff",
        },
      };
    },
    menu: (provided) => {
      return {
        ...provided,
        zIndex: 50,
        backgroundColor: backgroundColor ? backgroundColor : "#ffffff",
        ...style,
      };
    },
  };

  const selectClass = classNames("select", `select-${selectSize}`, className);

  return (
    <div ref={elementRef} className="shadow-custom" style={{ borderRadius: borderRadius }}>
    <Component
      className={selectClass}
      classNamePrefix={"select"}
      ref={ref}
      styles={styles}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          neutral20:
            mode === "dark" ? twColor.gray["600"] : twColor.gray["300"],
          neutral30:
            mode === "dark" ? twColor.gray["600"] : twColor.gray["300"],
          neutral80: twColor.gray["700"],
          primary25: twColor[themeColor]["50"],
          primary50: twColor[themeColor]["100"],
          primary: twColor[themeColor][primaryColorLevel],
        },
      })}
      themeColor={`${themeColor}-${primaryColorLevel}`}
      components={{
        IndicatorSeparator: () => null,
        Option: DefaultOption,
        LoadingIndicator: DefaultLoadingIndicator,
        DropdownIndicator: DefaultDropdownIndicator,
        ClearIndicator: DefaultClearIndicator,
        ...components,
      }}
      {...field}
      {...rest}
    />
    </div>
  );
});

Select.propTypes = {
  size: PropTypes.oneOf([SIZES.LG, SIZES.MD, SIZES.SM]),
  componentAs: PropTypes.elementType,
};

Select.defaultProps = {
  componentAs: ReactSelect,
};

export default Select;
