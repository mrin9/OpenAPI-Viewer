<template>
<div id="tabs" class="container">
    <div class="tabs">
        <a @click="activetab=1" :class="[ activetab === 1 ? 'active' : '' ]">Tab 1</a>
        <a @click="activetab=2" :class="[ activetab === 2 ? 'active' : '' ]">Tab 2</a>
        <a @click="activetab=3" :class="[ activetab === 3 ? 'active' : '' ]">Tab 3</a>
    </div>
    <slot></slot>
</div>
</template>

<script>

    export default {
        props: {
            cacheLifetime: {
                default: 5,
            },
            options: {
                type: Object,
                required: false,
                default: () => ({
                    useUrlFragment: true,
                    defaultTabHash: null,
                }),
            },
        },

        data: () => ({
            tabs: [],
            activeTabHash: '',
            activeTabIndex: 0,
            lastActiveTabHash: '',
        }),

        created() {
            this.tabs = this.$children;
        },

        mounted() {
            if (this.tabs.length) {
                this.selectTab(this.tabs[0].hash);
            }
        },

        methods: {
            findTab(hash) {
                return this.tabs.find(tab => tab.hash === hash);
            },

            selectTab(selectedTabHash, event) {
                // See if we should store the hash in the url fragment.
                if (event && !this.options.useUrlFragment) {
                    event.preventDefault();
                }

                const selectedTab = this.findTab(selectedTabHash);

                if (! selectedTab) {
                    return;
                }

                if (selectedTab.isDisabled) {
                    event.preventDefault();
                    return;
                }

                if (this.lastActiveTabHash === selectedTab.hash) {
                    this.$emit('clicked', { tab: selectedTab });
                    return;
                }

                this.tabs.forEach(tab => {
                    tab.isActive = (tab.hash === selectedTab.hash);
                });

                this.$emit('changed', { tab: selectedTab });

                this.activeTabHash = selectedTab.hash;
                this.activeTabIndex = this.getTabIndex(selectedTabHash);

                this.lastActiveTabHash = this.activeTabHash = selectedTab.hash;

            },

            setTabVisible(hash, visible) {
                const tab = this.findTab(hash);

                if (! tab) {
                    return;
                }

                tab.isVisible = visible;

                if (tab.isActive) {
                    // If tab is active, set a different one as active.
                    tab.isActive = visible;

                    this.tabs.every((tab, index, array) => {
                        if (tab.isVisible) {
                            tab.isActive = true;

                            return false;
                        }

                        return true;
                    });
                }
            },
            
            getTabIndex(hash){
            	const tab = this.findTab(hash);
            	
            	return this.tabs.indexOf(tab);
            },
            
			getTabHash(index){
            	const tab = this.tabs.find(tab => this.tabs.indexOf(tab) === index);
            	
            	if (!tab) {
					return;
                }
                
                return tab.hash;
			},
            
            getActiveTab(){
            	return this.findTab(this.activeTabHash);
            },
            
			getActiveTabIndex() {
            	return this.getTabIndex(this.activeTabHash);
            },
        },
    };
</script>