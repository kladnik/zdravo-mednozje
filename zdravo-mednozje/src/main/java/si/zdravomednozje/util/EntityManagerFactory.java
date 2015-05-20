package si.zdravomednozje.util;

import javax.inject.Inject;
import javax.persistence.EntityManager;

public class EntityManagerFactory {
	
	@Inject
	private Resource resource;
	
	public EntityManager getEntityManager(){
		return resource.getEntityMangger();
	}

}
