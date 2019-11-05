<?php 

namespace CohaPriceWithQuantity;

use Doctrine\ORM\Tools\SchemaTool;
use Doctrine\Common\Collections\ArrayCollection;
use Shopware\Components\Plugin;
use Shopware\Components\Plugin\Context\InstallContext;
use Shopware\Components\Plugin\Context\UpdateContext;
use Shopware\Components\Plugin\Context\UninstallContext;
use Shopware\Components\Theme\LessDefinition;
use Shopware\Components\Plugin\Context\ActivateContext;

class CohaPriceWithQuantity extends Plugin
{

    public function install(InstallContext $context)
    {
        $service = $this->container->get('shopware_attribute.crud_service');
        // Install Context
    }

    public function update(UpdateContext $context) {
        // 
    }

    // On Activation
    public function activate(ActivateContext $context)
    {
        // Activation
        $context->scheduleClearCache(ActivateContext::CACHE_LIST_ALL);
    }

    public function uninstall(UninstallContext $context)
    {
        // Uninstallation
        $service = $this->container->get('shopware_attribute.crud_service');
    }

    public function addLessFiles(){
        return new LessDefinition(
            [],
            [
                // Beautiful Emotions
                __DIR__ . '/Resources/views/frontend/_public/src/less/coha-price-with-quantity.less',
            ]
        );
    }

    public function onCollectJavascriptFiles()
    {
        $jsFiles = [
            // Custom JS
            $this->getPath() . '/Resources/views/frontend/_public/src/js/coha-price-with-quantity.js',
        ];
        return new ArrayCollection($jsFiles);
    }

    public static function getSubscribedEvents()
    {
        return [
            'Enlight_Controller_Action_PreDispatch_Frontend' => ['onFrontend',-100],
            'Enlight_Controller_Action_PreDispatch_Widgets' => ['onFrontend',-100],
            'Theme_Compiler_Collect_Plugin_Less' => 'addLessFiles',
            'Theme_Compiler_Collect_Plugin_Javascript' => 'onCollectJavascriptFiles',
        ];
    }

    /**
     * @param \Enlight_Event_EventArgs $args
     * @throws \Exception
     */
    public function onFrontend(\Enlight_Event_EventArgs $args)
    {
        $this->container->get('Template')->addTemplateDir(
            $this->getPath() . '/Resources/views/'
        );
    }

}
