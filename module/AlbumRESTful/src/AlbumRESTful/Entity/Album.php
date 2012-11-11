<?php
// module/AlbumRESTful/src/AlbumRESTful/Entity/Album.php:
namespace AlbumRESTful\Entity;

use Doctrine\ORM\Mapping as ORM;
use Zend\Form\Annotation as Form;
use \JsonSerializable;

/**
 * A music album.
 *
 * @ORM\Entity
 * @ORM\Table(name="album")
 * @property string $artist
 * @property string $title
 * @property int $id
 */
class Album
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer");
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Form\Required(false)
     * @Form\Attributes({"type":"hidden"})
     */
    protected $id;

    /**
     * @ORM\Column(type="string")
     * @Form\Required(true)
     * @Form\Attributes({"type":"text"})
     * @Form\Options({"label":"Artist"})
     * @Form\Filter({"name":"StringTrim"})
     * @Form\Validator({"name":"StringLength", "options":{"min":1, "max":100}})
     */
    protected $artist;

    /**
     * @ORM\Column(type="string")
     * @Form\Required(true)
     * @Form\Attributes({"type":"text"})
     * @Form\Options({"label":"Title"})
     * @Form\Filter({"name":"StringTrim"})
     * @Form\Filter({"name":"StripTags"})
     */
    protected $title;

    /**
     * Magic getter to expose protected properties.
     *
     * @param string $property
     * @return mixed
     */
    public function __get($property) 
    {
        return $this->$property;
    }

    /**
     * Magic setter to save protected properties.
     *
     * @param string $property
     * @param mixed $value
     */
    public function __set($property, $value) 
    {
        $this->$property = $value;
    }

    /**
     * Convert the object to an array.
     *
     * @return array
     */
    public function getArrayCopy() 
    {
        return get_object_vars($this);
    }

    /**
     * Populate from an array.
     *
     * @param array $data
     */
    public function exchangeArray($data = array()) 
    {
        $this->id     = (isset($data['id']))     ? $data['id']     : null;
        $this->artist = (isset($data['artist'])) ? $data['artist'] : null;
        $this->title  = (isset($data['title']))  ? $data['title']  : null;
    }
}