import {App, Component, defineAsyncComponent, shallowRef} from "vue";

declare interface ComponentRegister {
    component: Component
    name: string
}

export function registerGlobalComponent(app: App) {

    const Banner = defineAsyncComponent(() =>
        import('@/components/Homepage/Banner.vue')
    );

    const Parameters = defineAsyncComponent(() =>
        import('@/components/Homepage/Parameters.vue')
    );

    const Categories = defineAsyncComponent(() =>
        import('@/components/Homepage/Categories.vue')
    );

    const Guarantee = defineAsyncComponent(() =>
        import('@/components/Homepage/Guarantee.vue')
    );

    const NewIn = defineAsyncComponent(() =>
        import('@/components/Homepage/NewIn.vue')
    );

    const WhyChooseUs = defineAsyncComponent(() =>
        import('@/components/Homepage/WhyChooseUs.vue')
    );

    const Coupon = defineAsyncComponent(() =>
        import('@/components/Homepage/Coupon.vue')
    );

    const AppLayout = defineAsyncComponent(() => import('@/layouts/MainLayout.vue'));

    const LoadingScreen = defineAsyncComponent(() => import('@/components/LoadingScreen.vue'));

    const Button = defineAsyncComponent(() => import('@/components/Button.vue'));

    const Header = defineAsyncComponent(() => import('@/components/Header.vue'));

    const Footer = defineAsyncComponent(() => import('@/components/Footer.vue'));

    const ItemCard = defineAsyncComponent(() => import('@/components/ItemCard.vue'));

    const Loading = defineAsyncComponent(() => import('@/components/Loading.vue'));

    const TimeLineCard = defineAsyncComponent(() => import('@/components/TimeLineCard.vue'));

    const EmptyResult = defineAsyncComponent(() => import('@/components/EmptyResult.vue'));

    const Swiper = defineAsyncComponent(() => import('@/components/AllProducts/Swiper.vue'));

    const FilterCard = defineAsyncComponent(() => import('@/components/AllProducts/FilterCard.vue'));

    const TabProducts = defineAsyncComponent(() => import('@/components/AllProducts/TabProducts.vue'));

    const LeftPanel = defineAsyncComponent(() => import('@/components/ProductDetail/LeftPanel.vue'));

    const RightPanel = defineAsyncComponent(() => import('@/components/ProductDetail/RightPanel.vue'));

    const SizeSuggestion = defineAsyncComponent(() => import('@/components/SizeSuggestion.vue'));

    const VoucherSlide = defineAsyncComponent(() => import('@/components/VoucherSlide.vue'));

    const SocialMedia = defineAsyncComponent(() => import('@/components/Homepage/SocialMedia.vue'));

    const Pattern = defineAsyncComponent(() => import('@/components/Homepage/Pattern.vue'));

    const ComponentArray = shallowRef<ComponentRegister[]>([{component: Banner, name: 'banner'},
        {component: Banner, name: 'Banner'},
        {component: Parameters, name: 'Parameters'},
        {component: Categories, name: 'Categories'},
        {component: Guarantee, name: 'Guarantee'},
        {component: NewIn, name: 'NewIn'},
        {component: WhyChooseUs, name: 'WhyChooseUs'},
        {component: Coupon, name: 'Coupon'},
        {component: AppLayout, name: 'AppLayout'},
        {component: LoadingScreen, name: 'LoadingScreen'},
        {component: Button, name: 'Button'},
        {component: Header, name: 'Header'},
        {component: Footer, name: 'Footer'},
        {component: Loading, name: 'Loading'},
        {component: ItemCard, name: 'ItemCard'},
        {component: TimeLineCard, name: 'TimeLineCard'},
        {component: EmptyResult, name: 'EmptyResult'},
        {component: Swiper, name: 'Swiper'},
        {component: FilterCard, name: 'FilterCard'},
        {component: TabProducts, name: 'TabProducts'},
        {component: LeftPanel, name: 'LeftPanel'},
        {component: RightPanel, name: 'RightPanel'},
        {component: SizeSuggestion, name: 'SizeSuggestion'},
        {component: VoucherSlide, name: 'VoucherSlide'},
        {component: SocialMedia, name: 'SocialMedia'},
        {component: Pattern, name: 'Pattern'},
    ]);

    ComponentArray.value.forEach((index) => {
        app.component(index.name, index.component)
    })
}