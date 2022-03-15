import React, { useState, useRef } from 'react';
import { 
	DashboardOutlined,
	AppstoreOutlined,
	AntDesignOutlined,
	FileTextOutlined,
	SearchOutlined
} from '@ant-design/icons';
import { Link } from "react-router-dom";
import { AutoComplete, Input } from 'antd';
// import navigationConfig from "configs/NavigationConfig";
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon';

// function getOptionList (navigationTree: { key: string; path: string; title: string; icon: React.ForwardRefExoticComponent<Pick<AntdIconProps, "id" | "maxLength" | "className" | "style" | "tabIndex" | "autoFocus" | "placeholder" | "disabled" | "open" | "onBlur" | "onFocus" | "onKeyUp" | "onKeyDown" | "onMouseDown" | "onMouseEnter" | "onMouseLeave" | "onClick" | "aria-activedescendant" | "aria-atomic" | "aria-autocomplete" | "aria-busy" | "aria-checked" | "aria-colcount" | "aria-colindex" | "aria-colspan" | "aria-controls" | "aria-current" | "aria-describedby" | "aria-details" | "aria-disabled" | "aria-dropeffect" | "aria-errormessage" | "aria-expanded" | "aria-flowto" | "aria-grabbed" | "aria-haspopup" | "aria-hidden" | "aria-invalid" | "aria-keyshortcuts" | "aria-label" | "aria-labelledby" | "aria-level" | "aria-live" | "aria-modal" | "aria-multiline" | "aria-multiselectable" | "aria-orientation" | "aria-owns" | "aria-placeholder" | "aria-posinset" | "aria-pressed" | "aria-readonly" | "aria-relevant" | "aria-required" | "aria-roledescription" | "aria-rowcount" | "aria-rowindex" | "aria-rowspan" | "aria-selected" | "aria-setsize" | "aria-sort" | "aria-valuemax" | "aria-valuemin" | "aria-valuenow" | "aria-valuetext" | "onSelect" | "children" | "value" | "defaultValue" | "onChange" | "size" | "max" | "required" | "type" | "data" | "default" | "high" | "low" | "key" | "media" | "height" | "width" | "start" | "name" | "color" | "content" | "rotate" | "translate" | "hidden" | "cite" | "dir" | "form" | "label" | "slot" | "span" | "summary" | "title" | "pattern" | "acceptCharset" | "action" | "method" | "noValidate" | "target" | "accessKey" | "draggable" | "lang" | "prefix" | "contentEditable" | "inputMode" | "nonce" | "async" | "multiple" | "manifest" | "wrap" | "src" | "accept" | "allowFullScreen" | "allowTransparency" | "alt" | "as" | "autoComplete" | "autoPlay" | "capture" | "cellPadding" | "cellSpacing" | "charSet" | "challenge" | "checked" | "classID" | "cols" | "colSpan" | "controls" | "coords" | "crossOrigin" | "dateTime" | "defer" | "download" | "encType" | "formAction" | "formEncType" | "formMethod" | "formNoValidate" | "formTarget" | "frameBorder" | "headers" | "href" | "hrefLang" | "htmlFor" | "httpEquiv" | "integrity" | "keyParams" | "keyType" | "kind" | "list" | "loop" | "marginHeight" | "marginWidth" | "mediaGroup" | "min" | "minLength" | "muted" | "optimum" | "defaultChecked" | "suppressContentEditableWarning" | "suppressHydrationWarning" | "contextMenu" | "spellCheck" | "radioGroup" | "role" | "about" | "datatype" | "inlist" | "property" | "resource" | "typeof" | "vocab" | "autoCapitalize" | "autoCorrect" | "autoSave" | "itemProp" | "itemScope" | "itemType" | "itemID" | "itemRef" | "results" | "security" | "unselectable" | "is" | "playsInline" | "poster" | "preload" | "readOnly" | "rel" | "reversed" | "rows" | "rowSpan" | "sandbox" | "scope" | "scoped" | "scrolling" | "seamless" | "selected" | "shape" | "sizes" | "srcDoc" | "srcLang" | "srcSet" | "step" | "useMap" | "wmode" | "dangerouslySetInnerHTML" | "onCopy" | "onCopyCapture" | "onCut" | "onCutCapture" | "onPaste" | "onPasteCapture" | "onCompositionEnd" | "onCompositionEndCapture" | "onCompositionStart" | "onCompositionStartCapture" | "onCompositionUpdate" | "onCompositionUpdateCapture" | "onFocusCapture" | "onBlurCapture" | "onChangeCapture" | "onBeforeInput" | "onBeforeInputCapture" | "onInput" | "onInputCapture" | "onReset" | "onResetCapture" | "onSubmit" | "onSubmitCapture" | "onInvalid" | "onInvalidCapture" | "onLoad" | "onLoadCapture" | "onError" | "onErrorCapture" | "onKeyDownCapture" | "onKeyPress" | "onKeyPressCapture" | "onKeyUpCapture" | "onAbort" | "onAbortCapture" | "onCanPlay" | "onCanPlayCapture" | "onCanPlayThrough" | "onCanPlayThroughCapture" | "onDurationChange" | "onDurationChangeCapture" | "onEmptied" | "onEmptiedCapture" | "onEncrypted" | "onEncryptedCapture" | "onEnded" | "onEndedCapture" | "onLoadedData" | "onLoadedDataCapture" | "onLoadedMetadata" | "onLoadedMetadataCapture" | "onLoadStart" | "onLoadStartCapture" | "onPause" | "onPauseCapture" | "onPlay" | "onPlayCapture" | "onPlaying" | "onPlayingCapture" | "onProgress" | "onProgressCapture" | "onRateChange" | "onRateChangeCapture" | "onSeeked" | "onSeekedCapture" | "onSeeking" | "onSeekingCapture" | "onStalled" | "onStalledCapture" | "onSuspend" | "onSuspendCapture" | "onTimeUpdate" | "onTimeUpdateCapture" | "onVolumeChange" | "onVolumeChangeCapture" | "onWaiting" | "onWaitingCapture" | "onAuxClick" | "onAuxClickCapture" | "onClickCapture" | "onContextMenu" | "onContextMenuCapture" | "onDoubleClick" | "onDoubleClickCapture" | "onDrag" | "onDragCapture" | "onDragEnd" | "onDragEndCapture" | "onDragEnter" | "onDragEnterCapture" | "onDragExit" | "onDragExitCapture" | "onDragLeave" | "onDragLeaveCapture" | "onDragOver" | "onDragOverCapture" | "onDragStart" | "onDragStartCapture" | "onDrop" | "onDropCapture" | "onMouseDownCapture" | "onMouseMove" | "onMouseMoveCapture" | "onMouseOut" | "onMouseOutCapture" | "onMouseOver" | "onMouseOverCapture" | "onMouseUp" | "onMouseUpCapture" | "onSelectCapture" | "onTouchCancel" | "onTouchCancelCapture" | "onTouchEnd" | "onTouchEndCapture" | "onTouchMove" | "onTouchMoveCapture" | "onTouchStart" | "onTouchStartCapture" | "onPointerDown" | "onPointerDownCapture" | "onPointerMove" | "onPointerMoveCapture" | "onPointerUp" | "onPointerUpCapture" | "onPointerCancel" | "onPointerCancelCapture" | "onPointerEnter" | "onPointerEnterCapture" | "onPointerLeave" | "onPointerLeaveCapture" | "onPointerOver" | "onPointerOverCapture" | "onPointerOut" | "onPointerOutCapture" | "onGotPointerCapture" | "onGotPointerCaptureCapture" | "onLostPointerCapture" | "onLostPointerCaptureCapture" | "onScroll" | "onScrollCapture" | "onWheel" | "onWheelCapture" | "onAnimationStart" | "onAnimationStartCapture" | "onAnimationEnd" | "onAnimationEndCapture" | "onAnimationIteration" | "onAnimationIterationCapture" | "onTransitionEnd" | "onTransitionEndCapture" | "spin" | "twoToneColor"> & React.RefAttributes<HTMLSpanElement>>; breadcrumb: boolean; submenu: never[]; }[], optionTree?: any[] | undefined) {
// 	optionTree = optionTree ? optionTree : [];
// 	for ( const navItem of navigationTree ) {
// 		if(navItem.submenu.length === 0) {
// 			optionTree.push(navItem)
// 		}
// 		if(navItem.submenu.length > 0) {
// 			getOptionList(navItem.submenu, optionTree);
// 		}
// 	}
// 	return optionTree 
// }

// const optionList = getOptionList(navigationConfig)

const getCategoryIcon = (category: any) => {
	switch (category) {
		case 'dashboards':
			return <DashboardOutlined className="text-success"/>;
		case 'apps':
			return <AppstoreOutlined className="text-danger"/>;
		case 'components':
			return <AntDesignOutlined className="text-primary"/>;
		case 'extra':
			return <FileTextOutlined className="text-warning"/>;
		default:
			return null;
	}
}

// const searchResult = () => optionList.map((item) => {
// 	const category = item.key.split('-')[0]
// 	return {
// 		value: item.path,
// 		label: (
// 			<Link to={item.path}>
// 				<div className="search-list-item">
// 					<div className="icon">
// 						{getCategoryIcon(category)}
// 					</div>
// 					<div>
// 						<div className="font-size-sm text-muted">{category} </div>
// 					</div>
// 				</div>
// 			</Link>
// 		),
// 	};
// });

const SearchInput = (props: { active: any; close: any; isMobile: any; mode: any; }) => {
	const { active, close, isMobile, mode } = props
	const [value, setValue] = useState('');
	const [options, setOptions] = useState([])
	const inputRef = useRef(null);

	const onSelect = () => {
		setValue('')
		setOptions([])
		if(close) {
			close()
		}
  };

	const onSearch = (searchText: React.SetStateAction<string>) => {
		setValue(searchText)
	};

	return (
		<AutoComplete
			ref={inputRef} 
			className={`nav-search-input ${isMobile? 'is-mobile' : ''} ${mode === 'light' ? 'light' : ''}`}
			dropdownClassName="nav-search-dropdown"
			options={options}
			onSelect={onSelect}
			onSearch={onSearch}
			value={value}
		>
			<Input placeholder="Search..."  prefix={<SearchOutlined className="mr-0" />} />
		</AutoComplete>
	)
}

export default SearchInput
