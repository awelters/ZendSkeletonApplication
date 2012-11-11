<?php
// module/AlbumRESTful/src/AlbumRESTful/Controller/AlbumRESTfulController.php:
namespace AlbumRESTful\Controller;

use Zend\Mvc\Controller\AbstractRestfulController,
	Zend\Form\Annotation\AnnotationBuilder,
    Doctrine\ORM\EntityManager,
    AlbumRESTful\Entity\Album;

class AlbumRESTfulController extends AbstractRestfulController
{    
	 /**
     * @var Doctrine\ORM\EntityManager
     */
    protected $em;
    
    private function form(){
      $builder = new AnnotationBuilder();
      $form = $builder->createForm(new Album());
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

    public function getList() {
    	$content = $this->getEntityManager()->getRepository('AlbumRESTful\Entity\Album')->findAll();
    	for($i = 0; $i < count($content); ++$i) {
			$content[$i] = $content[$i]->getArrayCopy();
		}
    	return array("data" => $content);
	}
	
	public function get($id) {
		$content = $this->getEntityManager()->find('AlbumRESTful\Entity\Album', $id);
    	return array("data" => $content->getArrayCopy());
	}
	
	public function create($data) {
		$form = $this->form();
		$album = new Album();
		$form->setData($data);

		if ($form->isValid()) {
			$album->exchangeArray($form->getData()); 
			$this->getEntityManager()->persist($album);
			$this->getEntityManager()->flush();
			return array("created" => true, "data" => $album->getArrayCopy());
		}
		return array("created" => false, "data" => $data);
	}
	
	public function update($id, $data) {
		$album = $this->getEntityManager()->find('AlbumRESTful\Entity\Album', $id);

       	$form  = $this->form();
        $form->bind($album);

        $form->setData($data);
		if ($form->isValid()) {
			$this->getEntityManager()->flush();
			return array("updated" => true, "id" => $id, "data" => $album->getArrayCopy());
		}
		return array("updated" => false, "id" => $id, "data" => $album->getArrayCopy());
	}
	
	public function delete($id) {
		$album = $this->getEntityManager()->find('AlbumRESTful\Entity\Album', $id);
		if ($album) {
			$this->getEntityManager()->remove($album);
			$this->getEntityManager()->flush();
			return array("deleted" => true, 'id' => $id );
		}
		return array("deleted" => false, 'id' => $id );
	}
}
