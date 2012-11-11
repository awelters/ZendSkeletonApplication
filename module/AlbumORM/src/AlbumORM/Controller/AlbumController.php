<?php
// module/AlbumORM/src/AlbumORM/Controller/AlbumController.php:
namespace AlbumORM\Controller;

use Zend\Mvc\Controller\AbstractActionController,
    Zend\View\Model\ViewModel, 
    AlbumORM\Form\AlbumForm,
    Doctrine\ORM\EntityManager,
    AlbumORM\Entity\Album;

class AlbumController extends AbstractActionController
{
    /**
     * @var Doctrine\ORM\EntityManager
     */
    protected $em;

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
            'albums' => $this->getEntityManager()->getRepository('AlbumORM\Entity\Album')->findAll() 
        ));
    }

    public function addAction()
    {
    	$form = new AlbumForm();
        $form->get('submit')->setValue('Add');

        $request = $this->getRequest();
        if ($request->isPost()) {
            $album = new Album();
            $form->setInputFilter($album->getInputFilter());
            $form->setData($request->getPost());

            if ($form->isValid()) {
                $album->exchangeArray($form->getData()); 
                $this->getEntityManager()->persist($album);
                $this->getEntityManager()->flush();

                // Redirect to list of albums
                return $this->redirect()->toRoute('album-orm');
            }
        }
        return array('form' => $form);
    }

    public function editAction()
    {
    	$id = (int) $this->params()->fromRoute('id', 0);
        if (!$id) {
            return $this->redirect()->toRoute('album-orm', array(
                'action' => 'add'
            ));
        }
        $album = $this->getEntityManager()->find('AlbumORM\Entity\Album', $id);

        $form  = new AlbumForm();
        $form->bind($album);
        $form->get('submit')->setAttribute('value', 'Edit');

        $request = $this->getRequest();
        if ($request->isPost()) {
            $form->setInputFilter($album->getInputFilter());
            $form->setData($request->getPost());

            if ($form->isValid()) {
                $this->getEntityManager()->flush();

                // Redirect to list of albums
                return $this->redirect()->toRoute('album-orm');
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
            return $this->redirect()->toRoute('album-orm');
        }

        $request = $this->getRequest();
        if ($request->isPost()) {
            $del = $request->getPost('del', 'No');

            if ($del == 'Yes') {
                $id = (int) $request->getPost('id');
                $album = $this->getEntityManager()->find('AlbumORM\Entity\Album', $id);
                if ($album) {
                    $this->getEntityManager()->remove($album);
                    $this->getEntityManager()->flush();
                }
            }

            // Redirect to list of albums
            return $this->redirect()->toRoute('album-orm');
        }

        return array(
            'id'    => $id,
            'album' => $this->getEntityManager()->find('AlbumORM\Entity\Album', $id)
        );
    }
}