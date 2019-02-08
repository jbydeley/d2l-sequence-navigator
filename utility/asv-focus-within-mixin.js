/*
	@polymerMixin
	@memberOf D2L.Polymer.Mixins;
*/

export function ASVFocusWithinMixin(superClass) {
	return class extends superClass {
		static get properties() {
			return {
				focusWithin: {
					type: Boolean,
					notify: true
				}

			};
		}
		ready() {
			super.ready();
			this.addEventListener('focus', this._focusWithinOnFocus);
			this.addEventListener('blur', this._focusWithinOnBlur);
			this.addEventListener('defocus-parent', this._focusWithinOnBlur);
		}

		_focusWithinOnFocus() {
			this.fire('defocus-parent');
			this.focusWithin = true;
		}

		_focusWithinOnBlur() {
			this.focusWithin = false;

		}

		_focusWithinClass(focusWithin) {
			return focusWithin ? ' d2l-asv-focus-within' : '';
		}

		_getTrueClass(focusWithin, isSelected) {
			return `${ isSelected ? 'd2l-asv-current' : ''} ${ focusWithin ? 'd2l-asv-focus-within' : ''}`;
		}

	};
}
