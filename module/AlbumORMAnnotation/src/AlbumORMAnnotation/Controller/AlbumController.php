<?php
// module/AlbumORMAnnotation/src/AlbumORMAnnotation/Controller/AlbumController.php:
namespace AlbumORMAnnotation\Controller;

use Zend\Mvc\Controller\AbstractActionController,
    Zend\View\Model\ViewModel,
    Zend\Form\Annotation\AnnotationBuilder,
    Doctrine\ORM\EntityManager,
    AlbumORMAnnotation\Entity\Album;

class AlbumController extends AbstractActionController
{
    /**
     * @var Doctrine\ORM\EntityManager
     */
    protected $em;
    
    private function form(){
      $builder = new AnnotationBuilder();
      $form = $builder->createForm(new Album());
      $form->add(array(
        'name' => 'submit',
        'attributes' => array(
            'type'  => 'submit',
            'value' => 'Add',
            'id' => 'submitbutton',
        ),  
      ));
      return $form;
    }

    public function setEntityManager(EntityManager $em)
    {
        $this->em = $em;
    }
 
    public function getEntityManager()
    {
        if (null === $this->em) {
            $this->em = $this->getServiceLocator()->get('Doctrine\ORM\EntityManager');
        }
        return $this->em;
    } 

    public function indexAction()
    {
        return new ViewModel(array(
            'albums' => $this->getEntityManager()->getRepository('AlbumORMAnnotation\Entity\Album')->findAll() 
        ));
    }

    public function addAction()
    {
    	$form = $this->form();
      	$form->get('submit')->setValue('Add');

        $request = $this->getRequest();
        if ($request->isPost()) {
            $album = new Album();
            $form->setData($request->getPost());

            if ($form->isValid()) {
                $album->exchangeArray($form->getData()); 
                $this->getEntityManager()->persist($album);
                $this->getEntityManager()->flush();

                // Redirect to list of albums
                return $this->redirect()->toRoute('album-orm-annotation');
            }
        }
        return array('form' => $form);
    }

    public function editAction()
    {
    	$id = (int) $this->params()->fromRoute('id', 0);
        if (!$id) {
            return $this->redirect()->toRoute('album-orm-annotation', array(
                'action' => 'add'
            ));
        }
        $album = $this->getEntityManager()->find('AlbumORMAnnotation\Entity\Album', $id);

       	$form  = $this->form();
        $form->bind($album);
        $form->get('submit')->setAttribute('value', 'Edit');

        $request = $this->getRequest();
        if ($request->isPost()) {
            $form->setData($request->getPost());

            if ($form->isValid()) {
                $this->getEntityManager()->flush();

                // Redirect to list of albums
                return $this->redirect()->toRoute('album-orm-annotation');
            }
        }

        return array(
            'id' => $id,
            'form' => $form,
        );
    }

    public function deleteAction()
    {
    	$id = (int) $this->params()->fromRoute('id', 0);
        if (!$id) {
            return $this->redirect()->toRoute('album-orm-annotation');
        }

        $request = $this->getRequest();
        if ($request->isPost()) {
            $del = $request->getPost('del', 'No');

            if ($del == 'Yes') {
                $id = (int) $request->getPost('id');
                $album = $this->getEntityManager()->find('AlbumORMAnnotation\Entity\Album', $id);
                if ($album) {
                    $this->getEntityManager()->remove($album);
                    $this->getEntityManager()->flush();
                }
            }

            // Redirect to list of albums
            return $this->redirect()->toRoute('album-orm-annotation');
        }

        return array(
            'id'    => $id,
            'album' => $this->getEntityManager()->find('AlbumORMAnnotation\Entity\Album', $id)
        );
    }
}