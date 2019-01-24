import './d2l-inner-module.js';
import './d2l-activity-link.js';
import { CompletionStatusMixin } from '../utility/completion-status-mixin.js';
import { PolymerASVLaunchMixin } from '../utility/polymer-asv-launch-mixin.js';
import 'd2l-accordion/d2l-accordion.js';
import 'd2l-colors/d2l-colors.js';
import 'd2l-icons/d2l-icons.js';
import 'd2l-offscreen/d2l-offscreen.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
/*
@memberOf window.D2L.Polymer.Mixins;
@mixes D2L.Polymer.Mixins.CompletionStatusMixin
@mixes D2L.Polymer.Mixins.PolymerASVLaunchMixin
*/
class D2LOuterModule extends PolymerASVLaunchMixin(CompletionStatusMixin()) {
	static get template() {
		return html`
		<style>
			:host {
				display: block;
				cursor: pointer;
				@apply --d2l-body-compact-text;
				width: 100%;
				--d2l-outer-module-text-color: var(--d2l-asv-text-color);
				--d2l-outer-module-background-color: transparent;
				--d2l-activity-link-padding: 10px 24px;
			}

			#header-container {
				--d2l-outer-module-border-color: var(--d2l-outer-module-background-color);
				box-sizing: border-box;
				padding: var(--d2l-activity-link-padding);
				color: var(--d2l-outer-module-text-color);
				background-color: var(--d2l-outer-module-background-color);
				border-style: solid;
				border-width: var(--d2l-outer-module-border-width, 2px 0px 2px 0);
				border-color:	var(--d2l-outer-module-border-color);
			}

			d2l-accordion-collapse:focus-within {
				--d2l-outer-module-background-color: var(--d2l-asv-hover-color);
				--d2l-outer-module-border-color: var(--d2l-asv-border-color);
				--d2l-outer-module-text-color: var(--d2l-asv-text-color);
				outline: none;
			}

			#header-container:hover {
				--d2l-outer-module-background-color: var(--d2l-asv-hover-color);
				--d2l-outer-module-border-color: var(--d2l-asv-border-color);
				--d2l-outer-module-text-color: var(--d2l-asv-text-color);
			}

			#header-container.d2l-asv-current:not(:hover) {
				--d2l-outer-module-background-color: var(--d2l-asv-primary-color);
				--d2l-outer-module-text-color: var(--d2l-asv-selected-text-color);
				--d2l-outer-module-border-color: var(--d2l-asv-border-color);
			}

			.module-header {
				display: table;
				table-layout: fixed;
				width: 100%;
			}

			.module-title {	
				@apply --d2l-body-compact-text;
				font-weight: 700;
				width: calc(100% - 2rem);

				overflow: hidden;
				text-overflow: ellipsis;
				float: left;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2; /* number of lines to show */
				max-height: 2.4rem; /* fallback */
				margin-top: -2px;
			}

			.module-completion-count {
				@apply --d2l-body-small-text;
				font-weight: 700;
				color: var(--d2l-outer-module-text-color);
				text-align: right;
				float: right;
				display: table-cell;
				width: 2rem;
				line-height: inherit !important;
			}

			.should-pad {
				padding: 0 10px;
			}

			ol {
				list-style-type: none;
				border-collapse: collapse;
				margin: 0px;
				padding: 0;
			}

			.optionalStatus {
				color: var(--d2l-color-tungsten);
			}

			d2l-icon {
				color: var(--d2l-outer-module-text-color);
			}

		</style>

		<d2l-accordion-collapse no-icons="" flex="" on-keyup="_keyUpListener">
			<div slot="header" id="header-container" class$="[[_getIsSelected(currentActivity)]]" on-click="_onHeaderClicked">
				<div class="module-header">
					<span class="module-title">[[entity.properties.title]]</span>
					<span class="module-completion-count">
						<template is="dom-if" if="[[showCount]]">
							<span class="countStatus" aria-hidden="true">
								[[localize('countStatus', 'completed', completionCompleted, 'total', completionTotal)]]
							</span>
							<d2l-offscreen>[[localize('requirementsCompleted', 'completed', completionCompleted, 'total', completionTotal)]]</d2l-offscreen>
						</template>
						<template is="dom-if" if="[[showCheckmark]]">
							<span class="completedStatus">
								<d2l-icon aria-label$="[[localize('completed')]]" icon="d2l-tier1:check"></d2l-icon>
							</span>
						</template>
						<template is="dom-if" if="[[showOptional]]">
							<span class="optionalStatus">
								[[localize('optional')]]
							</span>
						</template>
					</span>
				</div>
			</div>
			<ol>
				<template is="dom-repeat" items="[[subEntities]]" as="childLink">
					<li on-click="_onActivityClicked" class$="[[_padOnActivity(childLink)]]">
						<template is="dom-if" if="[[_isActivity(childLink)]]">
							<d2l-activity-link href="[[childLink.href]]" token="[[token]]" current-activity="{{currentActivity}}" on-sequencenavigator-d2l-activity-link-current-activity="childIsActiveEvent"></d2l-activity-link>
						</template>
						<template is="dom-if" if="[[!_isActivity(childLink)]]">
							<d2l-inner-module href="[[childLink.href]]" token="[[token]]" current-activity="{{currentActivity}}" on-sequencenavigator-d2l-inner-module-current-activity="childIsActiveEvent"></d2l-inner-module>
						</template>
					</li>
				</template>
			</ol>
		</d2l-accordion-collapse>
`;
	}

	static get is() {
		return 'd2l-outer-module';
	}
	static get properties() {
		return {
			currentActivity: {
				type: String,
				value: '',
				notify: true
			},
			subEntities: {
				type: Array,
				computed: 'getSubEntities(entity)'
			},
			hasChildren: {
				type: Boolean,
				computed: '_hasChildren(entity)'
			},
			showCount: {
				type: Boolean,
				value: false,
				computed: '_showCount(completionCount)'
			},
			showCheckmark: {
				type: Boolean,
				value: false,
				computed: '_showCheckmark(completionCount)'
			},
			showOptional: {
				type: Boolean,
				value: false,
				computed: '_showOptional(completionCount)'
			},
			disabled: {
				type: Boolean,
				observer: '_disableAccordions'
			},
			isSidebar: {
				type: Boolean
			}
		};
	}

	_keyUpListener(event) {
		if (event.keyCode === 13) {
			this._onHeaderClicked();
		}
	}

	_disableAccordions(disabled) {
		if (!disabled || !this.shadowRoot || !this.shadowRoot.querySelector('d2l-accordion-collapse')) {
			return;
		}
		this.shadowRoot.querySelector('d2l-accordion-collapse').setAttribute('opened', '');
		this.shadowRoot.querySelector('d2l-accordion-collapse').setAttribute('disabled', '');
	}

	_isAccordionOpen() {
		if (!this.shadowRoot || !this.shadowRoot.querySelector('d2l-accordion-collapse')) {
			return false;
		}
		return this.shadowRoot.querySelector('d2l-accordion-collapse').hasAttribute('opened');
	}

	_isOptionalModule() {
		return this.completionCount && this.completionCount.total === 0 && this.completionCount.optionalTotal > 0;
	}

	_isAllRequiredViewed() {
		return this.completionCount && this.completionCount.total > 0 && this.completionCount.total === this.completionCount.completed;
	}

	_isActivity(link) {
		return link && link.hasClass('sequenced-activity');
	}

	_showCount() {
		if (!this.hasChildren) {
			return false;
		}
		if (this._isAccordionOpen()) {
			return true;
		}
		return !this._isOptionalModule() && !this._isAllRequiredViewed();
	}

	_showCheckmark() {
		if (!this.hasChildren) {
			return false;
		}
		if (this._isAccordionOpen()) {
			return false;
		}
		return !this._isOptionalModule() && this._isAllRequiredViewed();
	}

	_showOptional() {
		if (!this.hasChildren) {
			return false;
		}
		if (this._isAccordionOpen()) {
			return false;
		}
		return this._isOptionalModule();
	}

	getSubEntities(entity) {
		return entity && entity.getSubEntities()
			.filter(subEntity => (subEntity.hasClass('sequenced-activity') && subEntity.hasClass('available')) || (subEntity.href && subEntity.hasClass('sequence-description')))
			.map(this._getHref);
	}

	_getHref(entity) {
		return entity && entity.getLinkByRel && entity.getLinkByRel('self') || entity || '';
	}

	_hasChildren(entity) {
		return entity && entity.getSubEntities().length !== 0;
	}

	_getIsSelected(currentActivity) {
		const selected = this.entity && this.entity.getLinkByRel('self').href === currentActivity;
		return (selected) ? 'd2l-asv-current' : '';
	}

	_padOnActivity(childLink) {
		return this.isSidebar || this._isActivity(childLink)
			? ''
			: 'should-pad';
	}

	_onActivityClicked(e) {
		const childLink =	e.model.__data.childLink;
		if (childLink.class.includes('sequenced-activity') && this.currentActivity !== childLink.href) {
			this.currentActivity = childLink.href;
		}
	}

	_onHeaderClicked() {
		this.currentActivity = this.entity.getLinkByRel('self').href;
		this._contentObjectClick();
	}

	childIsActiveEvent() {
		this.shadowRoot.querySelector('d2l-accordion-collapse').setAttribute('opened', '');
	}
}
customElements.define(D2LOuterModule.is, D2LOuterModule);
