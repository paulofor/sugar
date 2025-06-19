package br.com.gersis.loopback.modelo;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.strongloop.android.loopback.Model;
import com.strongloop.android.remoting.BeanUtil;
import org.json.JSONObject;


public class TracoPersonalidade extends Model {


	private String nome;
	private String codigo;
	private String nomeIngles;
	private String escala;
	// Relacionamentos 1
	// Relacionamentos N
	private List<PerguntaFormulario> PerguntaFormularios;
	private List<TracoBaby> TracoBabys;

	public void setId(Long id) {
		this.setIdObjeto(id);
	}
	public void setId(Integer id) {
		this.setIdObjeto(id);
	}

	public int getIdInteger() {
		return new Integer(getId().toString());
	}
	public long getIdLong() {
		return new Long(getId().toString());
	}

	public JSONObject getJSON() {
		JSONObject obj = new JSONObject();
		try {
			obj.put("id",getId());
			obj.put("nome", nome);
			obj.put("codigo", codigo);
			obj.put("nomeIngles", nomeIngles);
			obj.put("escala", escala);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}


	public void setNome(String valor) { 
		this.nome = valor;
	}
	public String getNome() { 
		return this.nome;
	}
	public void setCodigo(String valor) { 
		this.codigo = valor;
	}
	public String getCodigo() { 
		return this.codigo;
	}
	public void setNomeIngles(String valor) { 
		this.nomeIngles = valor;
	}
	public String getNomeIngles() { 
		return this.nomeIngles;
	}
	public void setEscala(String valor) { 
		this.escala = valor;
	}
	public String getEscala() { 
		return this.escala;
	}

	public List<PerguntaFormulario> getPerguntaFormularios() {
		return  PerguntaFormularios;
	}
	public void setPerguntaFormularios(List<PerguntaFormulario> valores) {
		this.PerguntaFormularios = new ArrayList<PerguntaFormulario>();
		for (int i = 0; i < valores.size(); i++) {
			Object objeto = new PerguntaFormulario();
			System.out.println(" --> ObjetoMap ");
			BeanUtil.setProperties(objeto, (Map<String, ? extends Object>) valores.get(i), true);
			this.PerguntaFormularios.add((PerguntaFormulario) objeto);
		}
	}
	public List<TracoBaby> getTracoBabys() {
		return  TracoBabys;
	}
	public void setTracoBabys(List<TracoBaby> valores) {
		this.TracoBabys = new ArrayList<TracoBaby>();
		for (int i = 0; i < valores.size(); i++) {
			Object objeto = new TracoBaby();
			System.out.println(" --> ObjetoMap ");
			BeanUtil.setProperties(objeto, (Map<String, ? extends Object>) valores.get(i), true);
			this.TracoBabys.add((TracoBaby) objeto);
		}
	}
}
