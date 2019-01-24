import './d2l-activity-link.js';
import { CompletionStatusMixin } from '../utility/completion-status-mixin.js';
import { PolymerASVLaunchMixin } from '../utility/polymer-asv-launch-mixin.js';
import 'd2l-colors/d2l-colors.js';
import 'd2l-icons/d2l-icons.js';
import 'd2l-offscreen/d2l-offscreen.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
/*
@memberOf window.D2L.Polymer.Mixins;
@mixes D2L.Polymer.Mixins.CompletionStatusMixin
@mixes D2L.Polymer.Mixins.PolymerASVLaunchMixin
*/
class D2LInnerModule extends PolymerASVLaunchMixin(CompletionStatusMixin()) {
	static get template() {
		return html`
		<style>
			:host {
				--d2l-inner-module-text-color: var(--d2l-asv-text-color);
				--d2l-activity-link-padding: 10px 14px;
				display: block;
				cursor: pointer;
				@apply --d2l-body-compact-text;
				--d2l-inner-module-background-color: transparent;
				margin: 10px 0;
				color: var(--d2l-inner-module-text-color);
				border-radius: 8px;
				background-color: var(--d2l-color-sylvite);
			}

			#header-container:focus,
			#header-container:hover {
				--d2l-inner-module-background-color: var(--d2l-asv-hover-color);
				--d2l-inner-module-border-color: var(--d2l-asv-border-color);
			}

			#header-container:focus-within {
				--d2l-inner-module-background-color: var(--d2l-asv-hover-color);
				--d2l-inner-module-border-color: var(--d2l-asv-border-color);
			}

			#header-container {
				--d2l-inner-module-border-color: var(--d2l-inner-module-background-color);
				display: flex;
				padding: 10px 0;
				border-radius: 8px 8px 0 0;
				border-style: solid;
				border-width: var(--d2l-inner-module-border-width, 0);
				border-color:	var(--d2l-inner-module-border-color, transparent);
			}

			#module-header {
				display: flex;
				flex-grow: 1;
				padding: 0 14px;
				background-color: var(--d2l-inner-module-background-color);
				border: 2px solid var(--d2l-inner-module-border-color, transparent);
				border-width: 2px 0;
			}

			#module-header > a {
				text-decoration: none;
				color: var(--d2l-inner-module-text-color);
				outline: none;
			}

			.d2l-asv-current:not(:hover) {
				--d2l-inner-module-background-color: var(--d2l-asv-primary-color);
				--d2l-inner-module-text-color: var(--d2l-asv-selected-text-color);
				--d2l-inner-module-border-color: var(--d2l-asv-border-color);
			}

			.module-title {	
				@apply --d2l-body-small-text;
				color: var(--d2l-inner-module-text-color);

				width: 100%;
				overflow: hidden;
				text-overflow: ellipsis;
				float: left;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2; /* number of lines to show */
				max-height: 2.0rem; /* fallback */
			}

			ol {
				list-style-type: none;
				border-collapse: collapse;
				margin: 0px;
				padding: 0px;
			}

		</style>

		<div id="header-container">
			<div id="module-header" class$="[[_getIsSelected(currentActivity, entity)]]" on-click="_onHeaderClicked">
				<a on-click="_onHeaderClicked" href="javascript:void(0)">
					<span class="module-title">[[entity.properties.title]]</span>
				</a>
			</div>
		</div>

		<ol>
			<template is="dom-repeat" items="[[subEntities]]" as="childLink">
				<li>
					<d2l-activity-link href="[[childLink.href]]" token="[[token]]" current-activity="{{currentActivity}}" on-sequencenavigator-d2l-activity-link-current-activity="childIsActiveEvent"></d2l-activity-link>
				</li>
			</template>
		</ol>
`;
	}

	static get is() {
		return 'd2l-inner-module';
	}
	static get properties() {
		return {
			currentActivity: {
				type: String,
				value: '',
				notify: true
			},
			hasCurrentActivity: {
				type: Boolean,
				value: false
			},
			subEntities: {
				type: Array,
				computed: 'getSubEntities(entity)'
			}
		};
	}

	getSubEntities(entity) {
		return entity && entity.getSubEntities()
			.filter(subEntity => (subEntity.hasClass('sequenced-activity') && subEntity.hasClass('available')) || (subEntity.href && subEntity.hasClass('sequence-description')))
			.map(this._getHref);
	}

	_getHref(entity) {
		return entity && entity.getLinkByRel && entity.getLinkByRel('self') || entity || '';
	}

	_getIsSelected(currentActivity, entity) {
		const selected = entity && entity.getLinkByRel('self').href === currentActivity;
		if (selected) {
			this.dispatchEvent(new CustomEvent('sequencenavigator-d2l-inner-module-current-activity', {detail: { href: this.href}}));
		}
		return (selected) ? 'd2l-asv-current' : '';
	}

	_onHeaderClicked() {
		this.currentActivity = this.entity.getLinkByRel('self').href;
		this._contentObjectClick();
	}

	childIsActiveEvent() {
		this.dispatchEvent(new CustomEvent('sequencenavigator-d2l-inner-module-current-activity', {detail: { href: this.href}}));
	}
}
customElements.define(D2LInnerModule.is, D2LInnerModule);
